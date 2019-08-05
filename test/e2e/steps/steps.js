const I = actor();
const mongoose = require('mongoose');
const UserModel = require('../models/user.model');
const config = require('../../config');
const FRONT_URL = config.front.url;
const BACK_URL = config.back.url;

Before(async() => {
  if(mongoose.connection.readyState === 0) {
    var mongoDB = 'mongodb://'+config.mongodb.host+':'+config.mongodb.port+'/'+config.mongodb.db+'';
    mongoose.connect(mongoDB, { useNewUrlParser: true })
        .then(()=> {})
        .catch((e)=> console.error("DB error !", e));
  }
  await cleanUpDb();
});

const cleanUpDb = async() => {
  await UserModel.deleteMany({});
}

After(async() => {
  await cleanUpDb();
  mongoose.connection.close()
        .then(()=> {})
        .catch((e)=> console.error("DB closing error !", e));
});

Fail(async(test, err) => {
  if(mongoose.connection.readyState !== 0) {
    await cleanUpDb();
    mongoose.connection.close()
          .then(()=> {})
          .catch((e)=> console.error("DB closing error !", e));
  }
});

Given('l\'utilisateur {string} avec l\'email {string} et le mdp {string} est enregistré', async (pseudo, email, mdp) => {
  await I.sendPostRequest(BACK_URL+'/auth/signup', {pseudo: pseudo, email: email, password: mdp});
});

When('je suis sur l\'écran de connexion', () => {
  I.amOnPage(FRONT_URL+'/auth/login');
});

When('je saisis l\'email {string}', (email) => {
  I.fillField('email', email);
});

When('je saisis le mdp {string}', (mdp) => {
  I.fillField('password', mdp);
});

When('je valide la connexion', () => {
  I.click('connexion', "#login-form");
});

Then('je suis connecté en tant que {string}', (pseudo) => {
  I.seeTextEquals(pseudo, '#pseudo-user-connected');
});

Then('je suis sur ma banque', () => {
  I.seeCurrentUrlEquals(FRONT_URL+'/bank');
});

Then('le message d\'erreur {string} s\'affiche dans le cadre de connexion', (msg) => {
  I.see(msg, {css: '.card-login'});
});

Given('je suis déconnecté', () => {
  I.dontSeeElement('#pseudo-user-connected');
});

When('je me rend sur l\'écran d\'accueil', () => {
  I.amOnPage(FRONT_URL);
});

Then('je suis redirigé sur l\'écran de connexion', () => {
  I.amOnPage(FRONT_URL+'/auth/login');
});

Given('je suis sur l\'écran d\'inscription', () => {
  I.amOnPage(FRONT_URL+'/auth/register');
});

When('je clique sur le l\'option de connexion du bandeau de navigation', () => {
  I.click("Connexion","#navbar");
});

Given('je suis connecté avec l\'email {string} avec le mdp {string}', async(email, mdp) => {
  I.amOnPage(FRONT_URL+'/auth/login');
  I.fillField('email', email);
  I.fillField('password', mdp);
  I.click('connexion', "#login-form");
});

When('je clique sur la option de déconnexion du bandeau de navigation', () => {
  I.click("Déconnexion","#navbar");
});

When('je clique sur l\'option d\'incription du bandeau de navigation', () => {
  I.click("Inscription","#navbar");
});

When('je saisis le champ {string} avec {string}', (name, value) => {
  I.fillField(name, value);
});

When('je valide la création du compte', () => {
  I.click('Valider', "#register-form");
});

Given('je suis redirigé sur l\'écran d\'inscription', () => {
  I.amOnPage(FRONT_URL+'/auth/register');
});

Then('le message {string} est affiché', (msg) => {
  I.see(msg);
});
