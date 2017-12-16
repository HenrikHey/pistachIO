/** 
 *  @author Henrik Hey.
 * 
 * @version 0.0.1 {ALPHA}
 * @name PistachIO
 * @description :
 *  PistachIO is a JavaScript library developed by Henrik Hey.
 *  It can be used for client side rendering of dynamic HTML documents and data retrieval from servers.
 *  PistachIO can be used free of charge by anyone and can be freely distributed.
 *  @requires
 *      - ES6 browswer compatibility 
 *  
 * @class pIOApp
 * 
 * @description 
 *  to handle all the dynamic components on the site
 */
class pIOApp {

    /**
     * @constructor
     */

    constructor(){
        this.renderer = new pistachIORenderer();
        return this;
    }
};
/**
 * @enum
 * 
 * @description 
 *  contains all the enums for the pIOapp @class
 */
pIOApp.prototype._ENUMS = {
    _APP_CLASS : "pIO-App",
    _APP_ATRIB : "appName",
};
/**
 * @type Array
 * @param { !String | !Integer | !Class }
 * @description contains all the renderable Apps in the WebApp. 
 */
pIOApp.prototype.defaults = {
    //--START OF 'loading stuff'--//
    loading : '<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>',
    loading_message : '<p>Getting Data...</p>',
    //--END OF 'Loading Stuff'--//
};
/**
 * @type {Array<!Object>}
 * 
 * @description is an array with contains all the pIO-Apps within the DOM
 */
pIOApp.prototype.all_apps = [];
/**
 * @function 
 * 
 * @param {!String | !Integer}
 * 
 * @description creates an application given two params 
 * 
 */
pIOApp.prototype._create_app = function(_app_name, _index) {
    return {
        app_name : _app_name,
        index : _index,
    };
};
/**
 * @type Array
 * 
 * @param { !Object | !Integer }
 * 
 * @description contains all the activities that are store for the webApp.
 * 
 */
pIOApp.prototype.all_activities = [];
/**
 * @function
 * 
 * @param {!String | !Integer}
 * 
 * @description creates an object to contain an activity.
 */
pIOApp.prototype._create_activity_object = function(_activity, _index) {
    return {
        activity : _activity, 
        index : _index,
    };
};
/**
 * @function
 * 
 * @param {!Integer}
 * 
 * @description
 */
pIOApp.prototype.get_activity = function(_index) {
    return this.all_activities[_index].activity;
};
/**
 * @type Array
 * 
 * @param {!Object | !Integer}
 * 
 * @description contains all the activities that are currently running in the current enviroment.
 */
pIOApp.prototype.all_current_activities = [];
/**
 * @function 
 * 
 * @param {!String | !String}
 * 
 * @description creats an object to be submitted to the {all_current_activities}s Array
 */
pIOApp.prototype._create_current_activity_object = function(_activity, _app_name) {
    return {
        activity : _activity, 
        app_name : _app_name,
    };
};
/**
 * @function
 * 
 * @param {!Integer}
 * 
 * @description
 */
pIOApp.prototype.get_current_activity = function(_index) {
    return this.all_current_activities[_index].activity;
};
/**
 * @type Array
 * 
 * @description contains the js Libs for the current context of the application.
 */
pIOApp.prototype.js_Libraries = [];
/**
 * @type Array
 * 
 * @description contains the css libs for the current context of the application.
 */
pIOApp.prototype.css_Libraries = [];
/**
 * @function init
 * 
 * @param none
 * 
 * @description initializes the App
 */
pIOApp.prototype.init = function() {
    document.body.innerHTML = '<div id="current-required-libs">\n'+'</div>' + document.body.innerHTML;
    for(let i = 0; i < document.getElementsByClassName(this._ENUMS._APP_CLASS).length; i++) {
        this.all_apps.push(this._create_app(document.getElementsByClassName(this._ENUMS._APP_CLASS)[i].getAttribute(this._ENUMS._APP_ATRIB)));
    };
};
/**
 * @function
 * 
 * @param {!String}
 * 
 * @description gets the class index based on a given attribute name
 */
pIOApp.prototype.getClassIndexByAttribName = function(_Attrib_Name) {
    for(let i = 0; i < document.getElementsByClassName(this._ENUMS._APP_CLASS).length; i++) {
        if(document.getElementsByClassName(this._ENUMS._APP_CLASS)[i].getAttribute(this._ENUMS._APP_ATRIB) == _Attrib_Name) {
            return i;
        }
    }
    return;
};
/**
 * @function
 * 
 * @description submits a library to the DOM dynamically
 */
pIOApp.prototype.submitLibrariesToDOM = function() {
    let libraries_html = '';
    for(let i = 0; i < this.js_Libraries.length; i++) {
        libraries_html += '<script src="' + this.js_Libraries[i].address + '"></script> <!--'+ this.js_Libraries[i].name + '-->';
    }
    for(let i = 0; i < this.css_Libraries.length; i++) {
        libraries_html += '<link rel="stylesheet" href="' + this.css_Libraries[i].address + '">';
    }
    document.getElementById('current-required-libs').innerHTML = libraries_html;
};
/**
 * @function
 * 
 * @param {!String | !String}
 * 
 * @description adds a js library to the DOM.
 */
pIOApp.prototype.addJSLibrary = function(library_name, library_address) {
    this.js_Libraries.push({ name : library_name, address : library_address });
    this.submitLibrariesToDOM();
};
/**
 * @function
 * 
 * @param {!String | !String}
 * 
 * @description removes a js library to the DOM.
 */
pIOApp.prototype.removeJSLibrary = function(library_name, library_address) {
    let temp = [];
    for(let i = 0; i < this.js_Libraries.length; i++) {
        if(this.js_Libraries[i].name == library_name || this.js_Libraries[i].address == library_address)continue;
        temp.push(this.js_Libraries[i]);
    }
    this.js_Libraries = temp;
    this.submitLibrariesToDOM();
};
/**
 * @function
 * 
 * @param {!String | !String}
 * 
 * @description adds a css library to the DOM.
 */
pIOApp.prototype.addCSSLibrary = function(library_name, library_address) {
    this.css_Libraries.push({ name : library_name, address : library_address });
    this.submitLibrariesToDOM();
};
/**
 * @function
 * 
 * @param {!String | !String}
 * 
 * @description removes a css library to the DOM.
 */
pIOApp.prototype.removeCSSLibrary = function(library_name, library_address) {
    let temp = [];
    for(let i = 0; i < this.css_Libraries.length; i++) {
        if(this.css_Libraries[i].name == library_name || this.css_Libraries[i].address == library_address)continue;
        temp.push(this.css_Libraries[i]);
    }
    this.css_Libraries = temp;
    this.submitLibrariesToDOM();
};
/**
 * @description
 */
pIOApp.prototype.clearTarget = function(_target, _containsActivity) {
    if(_containsActivity == true) {
        for(let i = 0; i < document.getElementsByClassName(this._ENUMS._APP_CLASS).length; i++) {
            if(document.getElementsByClassName(this._ENUMS._APP_CLASS)[i].getAttribute(this._ENUMS._APP_ATRIB) == _target) {
                document.getElementsByClassName(this._ENUMS._APP_CLASS)[i].innerHTML = '';
            }
        } 
    }else {
        document.getElementsByClassName(this._ENUMS._APP_CLASS)[this.getClassIndexByAttribName(_target)].innerHTML= '';
    }
};
/**
 * @function createActivity
 * @param { !String | !Object<Array< !String>, Array< !String>> | !String | !Object }
 * @description Creates an activity that will be handles by the App.
 */
pIOApp.prototype.createActivity = function(name, libs, html, vars) {
    this.all_activities.push({
        activity : new Activity(name, libs, html, vars),
        index : this.all_activities.length
    });
    return this.all_activities.length-1;
};
/**
 * @function assignActivity
 * @param { !Integer | !String }
 * @description Assigns an activity to a render target.
 */
pIOApp.prototype.assignActivity = function(_activity, _app_name) {
    /**
     * checks if the target(app) is valid
     */
    for(let i = 0; i < this.all_apps.length; i++) {
        if(_app_name == this.all_apps[i].name)break;
        if(i == this.all_apps.length) {
            console.error('No app exists with the name ' + _app_name + '.');
            return;
        }
    }
    for(let i = 0; i < this.all_activities.length; i++) {
        if(_activity == this.all_activities[i].data)break;
        if(i == this.all_activities.length) {
            let temp = this.createActivity(
                _activity.getName(), 
                _activity.getLibs(), 
                _activity.getHTML(), 
                _activity.getVars()
            );
            this.all_current_activities.push(
                this._create_current_activity_object(temp, _app_name)
            );
            this.all_current_activities[this.all_current_activities.length-1].activity.setActiveMarker(this.all_current_activities.length-1);
            return;
        }
    }
    this.all_current_activities.push(
        this._create_current_activity_object(
            this.all_activities[_activity].activity, _app_name
        )
    );
    this.all_current_activities[this.all_current_activities.length-1].activity.setActiveMarker(this.all_current_activities.length-1);
    return this;
};
/**
 * @description
 */
pIOApp.prototype.getMarker = function() {
    return this.all_current_activities.length-1;
};
/**
 * @description
 */
pIOApp.prototype.createAjaxRequestForHTMLPage = function(html_page_name) {
    return $.ajax({
        type: "GET",
        url : "https://localhost/html/php/test.php", 
        data : { data : html_page_name},
        contentType: "HTML",
    });
};
/**
 * @description
 */
pIOApp.prototype.loadActivity = function(_index) {
    let _this = this;
    let request = this.createAjaxRequestForHTMLPage(this.all_current_activities[_index].activity.getHTML());
    request.success(function(data) {
        _this.all_current_activities[_index].activity.setHTML(data);
        _this.renderActivity(_index, data);
    });
};
/**
 * @description
 */
pIOApp.prototype.hasLoaded = function(code_to_be_ran) {
    code_to_be_ran();
};
/**
 * @description
 */
pIOApp.prototype.fadeAnimation = {
    prepareFadeIn : function(_app_name) {
        $('div[appName="'+_app_name+'"]').css({
            'opacity':0
        });
    },
    fadeIn : function(_app_name) {
        $('div[appName="'+_app_name+'"]').animate({
            'opacity':1
        }, "slow");
    },
    fadeOut : function(_app_name) {
        $('div[appName="'+_app_name+'"]').animate({
            'opacity':0
        }, "slow");
    }
};
/**
 * @description
 */
pIOApp.prototype.renderActivity = function(_index, _html) {
    if(_index > this.all_current_activities.length)return;
    let target = this.all_current_activities[_index].app_name;
    let htmlOut = '';
    if(_html == undefined || _html == null || _html == false || _html == 0) {
        htmlOut = '<center>\n'+
                    '<br><br><br>'+
                    this.defaults.loading +
                    '<br>' +
                    this.defaults.loading_message + 
                  '</center>';
    }else{
        htmlOut = this.renderer.render(_html, this.all_current_activities[_index].activity.getVars());
    }
    this.fadeAnimation.prepareFadeIn(target);
    document.getElementsByClassName(this._ENUMS._APP_CLASS)[this.getClassIndexByAttribName(target)].innerHTML = htmlOut;
    this.fadeAnimation.fadeIn(target);
    window.componentHandler.upgradeAllRegistered();
};
/**
 * @description
 */
pIOApp.prototype.upgradeActivity = function(_data, _index) {
    if(_index > this.all_activities.length)return;
    this.all_activities[-index] = {data : _data, index: _index};
};
/**
 * @description
 */
pIOApp.prototype.endActivity = function(_marker) {
    let temp = [];
    for(let i = 0; i < this.all_current_activities.length; i++) {
        if(this.all_current_activities[i].activity.getActiveMarker() == _marker) continue;
        temp.push(this.all_current_activities[i]);
    }
    this.all_current_activities = temp;
};
/**
 * @description
 */
pIOApp.prototype.checkIfUserIsOnTab = function() {
    $('window').blur(function () {
        // do some stuff after tab was changed e.g.
        alert('You switched the tab');
    });
};
/** 
    * @class pistachioRenderer
    *
    * give the dev a clear and readable way of rendering to templates through the pistachIO namespace.
    * 
    * @param {!String} 
    *  - render_target, the {ID} of the <div> Element to which data will be rendered to. 
    */
class pistachIORenderer {
    constructor() {}

    //this.init();
};
/**
    * @function replace
    * 
    * @param {!string|!string|!string}
    */
pistachIORenderer.prototype.replace = function(template, key, data) { 
    let output = '';
    let data_is_array = false;
    let data_array_index = 0;
    if(typeof(data) == 'Array') data_is_array = true;
    for(let i = 0; i < template.length; i++) {
        if(template.charAt(i) == '{' && template.charAt(i+1) == '{' && template.charAt(i+2) != '{') {
            let a = i+2;
            let keyword = '';
            while(template.charAt(a) != '}') {
                keyword+=template.charAt(a);
                a++;
            }
            if(keyword == key) {
                if(data_is_array) {
                    output+=data[data_array_index];
                    data_array_index++; 
                }else{
                    output+=data;
                }
                i+= keyword.length+3;
            }else{
                output+=template.charAt(i);
            }
        }else{
            output+=template.charAt(i);
        }
    }
    return (output).toString();
};
/**
 * @description
 */
pistachIORenderer.prototype.reuseable_Templates = {
    Id : [],
    template : []
};
/**
 * @description
 */
pistachIORenderer.prototype.processTemplate = function(template_Id, template) {
    this.reuseable_Templates.Id.push(template_Id);
    this.reuseable_Templates.template.push(template);
};
/**
 * @description
 */
pistachIORenderer.prototype.tag_enums = {
    _FUNCTION : '{_function}',
    _REPEAT : { _IDENTIFIER : '{_repeat.times:' }, 
};
/**
 * @description Processes all of the existing tags within a template 
 */
pistachIORenderer.prototype.processTemplateTags = function(template) {
    for(let i = 0; i < template.length; i++) {
        if(template.charAt(i) == '{' && template.charAt(i+1) == '{' && template.charAt(i+2) == '{') {
            let a = i+3;
            let contained_js = '';

            var contains_func = false;
            var _repeat = {
                contains_repeat : false,
                repeat_amount : 0,
            };

            if(template.substring(a, a+this.tag_enums._FUNCTION.length) == this.tag_enums._FUNCTION) {
                a+=this.tag_enums._FUNCTION.length+1;
                contains_func = true;
            }else if(template.substring(a, a+this.tag_enums._REPEAT._IDENTIFIER.length) == this.tag_enums._REPEAT._IDENTIFIER) {
                a+=this.tag_enums._REPEAT._IDENTIFIER.length;
                let reps = '';
                while(template.charAt(a) != '}') {
                    reps += template.charAt(a);
                    a++;
                }
                _repeat.repeat_amount = parseInt(reps);
                _repeat.contains_repeat = true;
                a+=2;
            }
            
            while(template.substring(a, a+3) != '}}}') {
                contained_js += template.charAt(a);
                a++;
            }
            let compiled_js; 
            try {
                compiled_js = eval(contained_js);
                if(contains_func) {   
                    compiled_js = eval.call(null, compiled_js);
                }else if(_repeat.contains_repeat) {
                    let temp = '';
                    for(let p = 0; p < _repeat.repeat_amount; p++) {
                        temp+=compiled_js;
                    }
                    compiled_js = temp;
                }
            } catch(err){
                console.error(err);
                return template;
            }
            if(typeof(compiled_js) == 'string' || typeof(compiled_js) == 'number' || typeof(compiled_js) == 'boolean') {
                template = template.substring(0, i) + compiled_js + template.substring(a+3, template.length);
            }else if(typeof(compiled_js) == 'undefined') {
                console.log('{{{' + contained_js + '}}} returned an UNDEFINED value!');
            }     
            return this.processTemplateTags(template);
        }
    }
    return template;
};

/**
    * @function process
    *
    * process the given string and completes all the pistachIO calls withins
    * 
    */
pistachIORenderer.prototype.render = function(template, data) {
    template = this.processTemplateTags(template);
    for(let key in data) {
        template = this.replace(template, key, data[key]);
    }
    return template;
};

/**
    * @class AjaxHandler 
    *  
    * handles Ajax requests and makes sure dependant code runs accordingly.
    * 
    */

class AjaxHandler {

    constructor() {

    }
};

AjaxHandler.prototype.getData = function(_data, _phpFunc, _dataType, _contentType) {
    if(_dataType != null || _dataType != undefined || _dataType != '') {

    }
    return $.ajax({
        url : '' + _phpFunc, 
        data : _data
    });
};

/**
    * @class Activity
    *
    * Creates an Activity that handles all rendering and ajax calls based on its context.
    */

class Activity {
    
/** 
    * @constructor @param {!String : name, <Object> : libs, !String : html, <Object> : vars} 
    * 
    * Sets up the activity.
    */

    constructor(name, libs, html, vars) {
        this.name = name;
        this.libs = libs;
        this.vars = vars;
        this.html = html;
    };
    
};

Activity.prototype.getName = function() {
    return this.name;
};

Activity.prototype.getLibs = function() {
    return this.libs;
};

Activity.prototype.setHTML = function(new_html) {
    this.html = new_html;
};

Activity.prototype.getHTML = function() {
    return this.html;
};

Activity.prototype.getVars = function() {
    return this.vars;
};

Activity.prototype.setActiveMarker = function(_marker) {
    this.activeMarker = _marker;
};

Activity.prototype.getActiveMarker = function() {
    return this.activeMarker;
};

/**
    *Enum for activity Enums
    *@enum {String} 
    */
Activity.prototype.activityEnums = {
    init_success : false
};

/** 
    *Enum for onActor options
    *@enum {String}  
    */
Activity.prototype.onActorOptions = {
    ONCLICK : 'click',
};

Activity.prototype.run = function(js_to_be_run) {
    if(this.activityEnums.init_success) {
        js_to_be_run();   
    } else {
        console.log('The activity has not been initialized or has not finished initializing.');
    }
};

Activity.prototype.setCloseIdentifier = function(identifier, close_method, function_to_be_ran) {
    $(document).on(close_method, identifier, function(){
        function_to_be_ran();
    });
};
