const {Builder, By, Key, until} = require('selenium-webdriver');
var assert = require('assert');
const { doesNotMatch } = require('assert');

describe("Formulario de login", function () {

    it("Inicia sesion con exito", async function () {
        this.timeout(10000);

        let driver = await new Builder().forBrowser('chrome').build();
        try {
            // Navigate to Url
            await driver.get('http://www.localhost:3000/login');

            //Introduce email, contraseña y pulsa enter
            await driver.findElement(By.name('email')).sendKeys('armm@gmail.com');
            await driver.findElement(By.name('password')).sendKeys('123456', Key.ENTER);

            let firstResult = await driver.wait(until.elementLocated(By.css('h1')), 10000);

            //console.log(await firstResult.getAttribute('textContent'));
            assert.equal("Bienvenido, Usuario", await firstResult.getAttribute('textContent'));


        }
        finally {
           await driver.quit();
        }

    })


    it("Inicia sesion con exito", async function () {
        this.timeout(10000);

        let driver = await new Builder().forBrowser('chrome').build();
        try {
            // Navigate to Url
            await driver.get('http://www.localhost:3000/login');

            //Introduce email, contraseña y pulsa enter
            await driver.findElement(By.name('email')).sendKeys('armm@gmail.com');
            await driver.findElement(By.name('password')).sendKeys('dadadaa', Key.ENTER);

            let firstResult = await driver.wait(until.elementLocated(By.css('h1')), 10000);

            //console.log(await firstResult.getAttribute('textContent'));
            assert.equal("Bienvenido, Usuario", await firstResult.getAttribute('textContent'));


        }
        finally {
           await driver.quit();
        }

    })
})