
if (typeof (SUBU) == "undefined") {
    SUBU = {}
}

SUBU.test_ValidationOps = new function(){	
    this.init = function(){
    var form = $(".inputType");
        form_validator_check = {
            lastname: {
                verify: nullcheck,
                message: "Please enter the last name"
            },
            firstname: {
                verify: nullcheck,
                message: "Please enter the first fame"
            }
        };
        if (apz.app.CommonValidator.validateFields(form, form_validator_check)) {

            console.log("No Error");
        }else{
            console.log("Error");
        }
    }

}

test_Validation = SUBU.test_ValidationOps
