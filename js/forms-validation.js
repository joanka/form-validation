(function(){

function Validator(form) {
    this.form = form;
    this.fields = this.form.querySelectorAll('[required]');
    this.errors = [];
    this.errorsList = this.form.querySelector(".error-list");
    if(!this.fields.length) return;

    this.form.onsubmit = function(e) {
        e.preventDefault();

        var formValid = this.validate();
        
        if(formValid) {
            this.form.submit();
        } else {
            return false;
        }

    }.bind(this);  
}

Validator.prototype.validate = function() {
    this.clearErrors();

    for(var i = 0; i < this.fields.length; i++) {
        this.validateField(this.fields[i]);
    }

   if(!this.errors.length) {
       return true;
   } else {
       this.showErrors();   
       return false;
   }   
};

Validator.prototype.validateField = function (field) {
    var fieldValid = field.validity.valid;

    if (fieldValid) {
        this.markAsValid(field);
    } else {
        this.errors.push(field.dataset.errorMessage);
        this.markAsInvalid(field);
    }   
};

Validator.prototype.markAsValid = function(field) {
    field.classList.remove('invalid');
    field.classList.add('valid');
};

Validator.prototype.markAsInvalid = function(field) {
    field.classList.remove('valid');
    field.classList.add('invalid');
};

Validator.prototype.showErrors = function() {
    var list = document.createElement('ol');
    this.errorsList.appendChild(list);
    this.errorsList.classList.add('list-style');
    var errorsListElements = document.createDocumentFragment();

    for(var i = 0; i < this.errors.length; i++) {
        var liEl = document.createElement('li');
        liEl.textContent = this.errors[i];
        errorsListElements.appendChild(liEl);
    }  

    list.appendChild(errorsListElements);
};

Validator.prototype.clearErrors = function() {
    this.errors.length = 0;
    this.errorsList.classList.remove('list-style');
    this.errorsList.innerHTML = "";
};

var validator1 = new Validator(document.querySelector('#form'));

})();