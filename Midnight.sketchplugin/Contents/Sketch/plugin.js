function showConfigWindowHandler(n) {
	loadFramework(n) && DLMidnight.configureTheme()
}

function startupHandler(n) {
	if(!updated(n)) loadFramework(n) && DLMidnight.startup(n)
}

function updated(n) {
	if (NSClassFromString("DLMidnight") == null) return !1;
	var l = NSUserDefaults.standardUserDefaults().objectForKey("DLMidnight-v"),
		c = n.plugin.version(),
		u = (l && c != l);
	if(u) {
		var a = NSAlert.new(),
			p = n.plugin.urlForResourceNamed("runner-midnight-icon.png").path(),
			i = NSImage.alloc().initByReferencingFile(p);
		a.setMessageText("Thank you for updating Midnight");
		a.setInformativeText("Please restart Sketch to complete the update process.");
		a.setIcon(i); 
		a.addButtonWithTitle("Later");
		a.addButtonWithTitle("Restart");
		if(a.runModal() == "1001") {
			NSUserDefaults.standardUserDefaults().setObject_forKey(c, "DLMidnight-v");
			try { DLMidnight.restartSketch(); } catch(e) {}
		}
	}
	return u
}

function loadFramework(n) {
	if (null != NSClassFromString("Midnight")) return !0;
	var o = NSBundle.bundleWithURL(n.plugin.url()),
		r = Mocha.sharedRuntime();
	return r.loadFrameworkWithName_inDirectory("Midnight", o.resourceURL().path())
}