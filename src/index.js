const AboutApp      = require('./about-app');
const AppManager    = require('./app-manager');
const ContactApp    = require('./contact-app');
const ProjectsApp   = require('./projects-app');
const Taskbar       = require('./taskbar');
const WindowManager = require('./window-manager');

const windowManager = new WindowManager();
const appManager    = new AppManager(windowManager);
const taskbar       = new Taskbar(windowManager, appManager);

const apps = [
	{
		name:     'About',
		id:       'about',
		appClass: AboutApp
	},
	{
		name:     'Contact',
		id:       'contact',
		appClass: ContactApp
	},
	{
		name:     'Projects',
		id:       'projects',
		appClass: ProjectsApp
	},
];

for (const app of apps) {
	appManager.addApp(app.id, app.appClass);
	taskbar.addApp(app.name, app.id);
}
appManager.launch('about');
