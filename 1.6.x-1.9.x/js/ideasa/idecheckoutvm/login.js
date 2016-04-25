var IdeCheckoutvmLogin=Class.create();IdeCheckoutvmLogin.prototype={initialize:function(a,b,c){this.form=a;this.loginUrl=b.login;this.forgotpasswordUrl=b.forgotpassword;this.redirectUrl=b.redirect;this.validator=new Validation(this.form);this.popup=null;this.loginLinkText=c.loginLinkText;this.forgottenLinkText=c.forgottenLinkText;this.changeLinkId="idecheckoutvm-change-link";this._bind()},_bind:function(){this.popup=new Control.Modal($("idecheckoutvm-link-login"),{width:400,overlayOpacity:0.75,className:"modal-idecheckoutvm",fade:true});if(this.popup){this.popup.observe("afterOpen",function(a){$("login:username").focus()}.bind(this));this.popup.observe("afterClose",function(a){this.reset()}.bind(this))}},change:function(){this.reset();var a=$(this.changeLinkId).readAttribute("type");if(a=="login"){this._changeToLogin()}else{if(a=="forgotten"){this._changeToForgotPassword()}}},_changeToLogin:function(){ideForgotPasswordBlock.hide();ideLoginBlockInst.show();$(this.changeLinkId).update(this.forgottenLinkText);$(this.changeLinkId).writeAttribute("type","forgotten")},_changeToForgotPassword:function(){ideLoginBlockInst.hide();ideForgotPasswordBlock.show();$(this.changeLinkId).update(this.loginLinkText);$(this.changeLinkId).writeAttribute("type","login")},doLogin:function(){if(this.validator&&this.validator.validate()){var c=Form.serialize(this.form);var a=$(this.changeLinkId).readAttribute("type");var b=new Ajax.Request((a=="login"?this.forgotpasswordUrl:this.loginUrl),{method:"post",parameters:c,onSuccess:this._onSuccessLogin.bindAsEventListener(this)})}return false},_onSuccessLogin:function(transport){var response=null;if(transport&&transport.responseText){try{response=eval("("+transport.responseText+")")}catch(e){response={}}}if(response.success){if(response.message){this._showNoteMessage(response.message);setTimeout(window.location.href=this.redirectUrl,2000)}else{window.location.href=this.redirectUrl}}else{if(response.error){if(response.errorMessage.message){this._showErrorMessage(response.errorMessage.message)}else{this._clearMessage()}if(response.errorMessage.errorFields){var ideCheckoutValidationInst=new IdeCheckoutvmValidation(this.form);ideCheckoutValidationInst.fillFormErrors(response.errorMessage.errorFields)}}}},_showErrorMessage:function(b){var a='<div id="messages"><ul class="messages"><li class="error-msg"><ul><li><span>'+b+"</span></li></ul></li></ul></div>";$("idecheckoutvm-login-message").update(a)},_showNoteMessage:function(b){var a='<div id="messages"><ul class="messages"><li class="note-msg"><ul><li><span>'+b+"</span></li></ul></li></ul></div>";$("idecheckoutvm-login-message").update(a)},_clearMessage:function(){$("idecheckoutvm-login-message").update("")},reset:function(){this._clearMessage();this.validator.reset()},close:function(){this.popup.close()},forceLogin:function(a){this.popup.open();this._showNoteMessage(a);$(ideLoginBlockInst.usernameId).setValue($("billing:email").getValue());$(ideLoginBlockInst.passwordId).focus()}};var IdeLoginBlock=Class.create();IdeLoginBlock.prototype={initialize:function(){this.usernameId="login:username";this.passwordId="login:password";this.boxLocation="#idecheckoutvm-login-box div.front"},show:function(){$$(this.boxLocation).invoke("show");var b=$(this.usernameId);b.addClassName("required-entry");b.addClassName("validate-email");var a=$(this.passwordId);a.addClassName("required-entry");a.addClassName("validate-password")},hide:function(){$$(this.boxLocation).invoke("hide");var b=$(this.usernameId);b.removeClassName("required-entry");b.removeClassName("validate-email");var a=$(this.passwordId);a.removeClassName("required-entry");a.removeClassName("validate-password")},reset:function(){}};var ideLoginBlockInst=new IdeLoginBlock();var IdeForgotPasswordBlock=Class.create();IdeForgotPasswordBlock.prototype={initialize:function(){this.usernameId="forgotpassword:username";this.boxLocation="#idecheckoutvm-login-box div.back"},show:function(){$$(this.boxLocation).invoke("show");var a=$(this.usernameId);a.addClassName("required-entry");a.addClassName("validate-email")},hide:function(){$$(this.boxLocation).invoke("hide");var a=$(this.usernameId);a.removeClassName("required-entry");a.removeClassName("validate-email")}};var ideForgotPasswordBlock=new IdeForgotPasswordBlock();