if (typeof (apz) == "undefined") {
    apz = {};
    apz.app = {};
    apz.app.CommonValidator ={};
}

/* SAMPLE FUNCTIONS >> STARTS */

/* text */
function text(s) {
    s = s.trim();
    var specials = /[*|\":<>[\]{}`\\()',;@&$]/;
    err = !(specials.test(s)) && s.length ? 0 : 5;
    return [s];
}

/* check for null */
function nullcheck(s) {
    err = s.length ? 0 : 5;
    return err;
}

/* check for 4 digits last name */
function lastname(s){
    err = s.length > 4 ? 0 : 5;
    return err;
}

/* number */
function number(s) {
    s =  s.replace(/,/g , "");
    s = nwts(s) - 0;
    err = (s == 0) || isNaN(s) ? 10 : 0;
    return [err ? 0 : s];
}

/*float - 4,3 */
function floatNum(s) {
    var RE = /^[0-9]{1,4}(\.[0-9]{0,3})?$/;
    s = parseFloat(nwts(s));
    err = RE.test(s) ? 0 : 10;
    return err;
}

/* email validation */
function email(s) {   
    a = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(s));
    err = a ? 0 : 6;
    return err;
}


/* SAMPLE FUNCTIONS >> ENDS */

apz.app.CommonValidator.valid = function(element, check) {
    if (element.type == 'text' || element.type == 'textarea' || element.type == 'email') {
        return check(element.value);   
    } else {
        return check(element);
    }
};
/*

Once call this function
+ fetching the id or custom attribute from "form" attribute
+ After getting that particular value fetching the key from "list"
+based on the verify key validating the input values

*/
apz.app.CommonValidator.validateFields = function(form, list, flag) {
    let errorCount = 0,
        element,
        n,
        out;
        Object.keys(form).map(function(key, index) {
            if(typeof parseInt(key) == "number" && !isNaN(parseInt(key)) ){
                element = form[index];
                if (!element.hasAttribute("name")) {
                    n = element.id, out;
                } else if (element.hasAttribute("src")) {
                    n = element.src, out;
                } else {
                    n = element.name, out;
                }
                if (list[n] && list[n].verify) {
                    (list[n].verify).map(function(i,e){
                   	    apz.app.CommonValidator.valid(element, i);
                        if (err) {
                            list[n].err = err;                       
                            console.log("ERROR "+list[n].message[e] || "Error occured");
                            errorCount++;
                        }
                    })
                }
            }
        });
        if (errorCount > 0) {
            return false;
        }
        return true;
}

