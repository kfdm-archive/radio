var Radio = function() {
    var self = this;
    
    self.init = function() {
        self.timer = 1;
        self.hideTime = self.unixTime();
        
        self.ajaxLoader = '#ajax-loader';
        
        $(self.ajaxLoader).show();
    }
    
    self.hide = function() {
        self.hideTime = self.unix_time();
        $(document).stopTime();
    };
    
    self.remove = function() {
        $(document).stopTime();
    };
    
    self.unixTime = function() {
        return Math.ceil(new Date().getTime()/1000);
    }
    
    self.load = function() {
        self.sleepTime = self.unixTime()-self.hideTime;
        self.timer = self.timer - self.sleepTime;
        alert(self.timer);
        if(self.timer < 0 ) {
            self.updateSong();
            self.updateUpcoming();
        } else {
            $(document).everyTime(1000,'updateTime',self.updateTime);
        }
    };
    
    self.updateTime = function() {
        if(--self.timer <= 0) {
            $(document).stopTime('updateTime');
            self.updateSong();
            self.updateUpcoming();
            return;
        }
        var min = Math.floor(self.timer / 60);
        var sec = Math.floor(self.timer % 60);
        if(sec < 10) sec = '0'+sec;
        self.renderDuration(min,sec);
    };
    
    self.updateSong = function() {
        $(self.ajaxLoader).show();
        widget.system("/usr/bin/python Bin/playing.py",function(obj){
            $(self.ajaxLoader).hide();
            if(obj.status != 0) {
                self.renderError(obj.errorString);
                //Try again in 10 seconds
                $(document).oneTime(10000,'updateSong',self.updateSong);
                return;
            }
            var json = $.parseJSON(obj.outputString);
            self.renderSong(json);
            self.timer = json.timer;
            $(document).everyTime(1000,'updateTime',self.updateTime);
        });
    };
    
    self.updateUpcoming = function() {
        widget.system("/usr/bin/python Bin/upcoming.py",function(obj){
            if(obj.status != 0) {
                self.renderUpcoming(obj.outputString);
            } else {
                self.renderUpcoming(obj.outputString);
            }
        });
    };
    
    self.renderSong = function(json) { };
    self.renderUpcoming = function(text) { };
    self.renderError = function(text) { };
    self.renderDuration = function(min,sec) { };
    
    self.init();
}
