/**
 * by naiteluo
 */

var tab_template = '<li><a href="#{filename}" data-toggle="tab">{filename}</a></li>';
var tab_pane_template = '<div class="tab-pane" id="{filename}"><textarea name="cm-{filename}" id="cm-{filename}" cols="30" rows="10"></textarea></div>';

var _CH = {
  init: function (server, isDebug) {
    delete this.init;   // protect CR

    CH = {};

    (function (CH) {
      CH.isDebug = isDebug || false;
      CH.files = {};

      // start
      CH.start = function () {
        CH.setNewFileListener();
        new CH.File('undefined', 'javascript');
      }

      CH.setNewFileListener = function () {
        $('li#new-tab i').bind('click', function () {
          var fileName = $('li#new-tab input').val();
          // validate name, or decided type based on fileName, not finish yet
          if(/^.*\.js$/.test(fileName)) {
            new CH.File(fileName, 'javascript');
          } else {
            alert('Invalid file name');
          }
          $('li#new-tab input').val('');
        });
      }

      // File constructor 
      CH.File = function (name, type, options) {
        this.name = name;
        this.type = type;
        var _this = this;
        if(!options) {
          // default options if none
          var options = {
            lineNumbers: true,
            matchBrackets: true,
            theme: 'eclipse',
            onChange: function (cm, obj) {
              cm.save();
              _this.sync();
            }
          }
        }
        // insert elements
        var tab = $(tab_template.replace(/{filename}/g, name));
        var tab_pane = $(tab_pane_template.replace(/{filename}/g, name));
        $('li#new-tab').before(tab);
        $('div.tab-content').append(tab_pane);
        tab.find('a').tab('show');
        this.cm = CodeMirror.fromTextArea(tab_pane.find('textarea')[0], options);
        this.cm.setValue('/* created at ' + (new Date()).toDateString() + ' */');
        this.cm.refresh();
        CH.files[name] = this;
        CH.debug('files "' + name + '" created.');
      }

      CH.File.prototype.sync = function () {
        var content = this.cm.getValue();
        // send Value to server

      }

      // Auth constructor, handling auth and user infos
      CH.Auth = function () {

      }

      // signup, ajax
      CH.Auth.prototype.signup = function (email, password, nick) {

      }

      // login, ajax
      CH.Auth.prototype.login = function (email, password) {
        // set Auth's name email and password if succeed
      }

      // logou, ajax
      CH.Auth.prototype.logout = function () {

      }

      // socket container and helper
      CH.Socket = function () {
        this.TYPE = {

        }
        this.socket = io.connect(document.location.origin);
      }

      // on method
      CH.Socket.prototype.on = function (type, cb) {
        this.socket.on(type, cb);
      }

      // emit method
      CH.Socket.prototype.emit = function (type, data) {
        this.socket.emit(type, data);
      }

      // show debug message
      CH.debug = function (message) {
        return CH.isDebug && console.log && console.log(message);
      }

    })(CH);

    CH.start();
  } // end of _CH.init
}

$(function () {
  _CH.init();
})