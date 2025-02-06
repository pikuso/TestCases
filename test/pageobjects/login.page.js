const Page = require('./page');

class LoginPage extends Page {
    get inputUsername() {
        return $('[data-test="username"]');
    }

    get inputPassword() {
        return $('[data-test="password"]');
    }

    get btnSubmit() {
        return $('[data-test="login-button"]');
    }

    get errorMessage() {
        return $('[data-test="error"]');  
    }

    get errorIconUsername() {
        return $('[data-test="username"] ~ .error_icon'); 
    }
    
    get errorIconPassword() {
        return $('[data-test="password"] ~ .error_icon'); 
    }
    
    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    open() {
        return super.open('');  
    }
}

module.exports = new LoginPage();
