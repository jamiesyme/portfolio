const Markdown = require('./markdown').default;
const Template = require('./template');

class ProjectsApp {
	constructor (windowManager) {
		this.window = windowManager.openWindow({
			title:        'Projects',
			content:      require('./projects-app.html'),
			contentClass: 'projects-app',
			size:         { width: 880, height: 680 },
			minSize:      { width: 350, height: 420 },
		});

		const $canvas       = this.window.$canvas;
		const $viewer       = $canvas.find('.project-viewer');
		const $back         = $viewer.find('.back-button');
		const $header       = $canvas.find('.app-title');
		const $tiles        = $canvas.find('.project-tiles');
		const $tileWrapper  = $canvas.find('.project-tiles-wrapper');

		// Connect the back button on the project viewer
		$back.click(e => history.back());
		window.onpopstate = function () {
			$viewer.find('.project').remove();
			$viewer.hide();
			$header.show();
			$tileWrapper.show();
		};

		// Render the project tiles
		for (const project of ProjectsApp.projects) {
			const tileTmpl = require('./project-tile.html');
			const tileHtml = Template.render(tileTmpl, project);
			const $li = $('<li />');
			const $tile = $(tileHtml);
			$li.append($tile);
			$tiles.append($li);

			// When a tile is clicked, render the project and switch to the
			// project viewer
			$tile.click(e => {
				function renderElement(mdElem) {
					function createElement(mdElem) {
						switch (mdElem.type) {
						case Markdown.BlockType.heading1:
							return $('<h1>');
						case Markdown.BlockType.heading2:
							console.log(mdElem);
							return $('<h2>');
						case Markdown.BlockType.heading3:
							return $('<h3>');
						case Markdown.BlockType.paragraph:
							return $('<p>');
						case Markdown.BlockType.unorderedList:
							return $('<ul>');
						case Markdown.BlockType.listItem:
							return $('<li>');
						case Markdown.ElementType.image:
							return $('<img>')
								.attr('alt', mdElem.content)
								.attr('src', mdElem.url);
						case Markdown.ElementType.link:
							return $('<a>')
								.text(mdElem.content)
								.attr('href', mdElem.url)
								.attr('target', '_blank');
						case Markdown.ElementType.text:
							return $(document.createTextNode(mdElem.content));
						}
					}
					const $elem = createElement(mdElem);
					if (mdElem.elements) {
						for (const childElem of mdElem.elements) {
							$elem.append(renderElement(childElem));
						}
					}
					return $elem;
				}

				const $project = $('<div>').addClass('project');
				for (const mdElem of project.markdown) {
					const $elem = renderElement(mdElem);
					const isScreenshots = (() => {
						if (mdElem.type !== Markdown.BlockType.unorderedList) {
							return false;
						}
						for (const listElem of mdElem.elements) {
							for (const elem of listElem.elements) {
								if (elem.type !== Markdown.ElementType.image) {
									return false;
								}
							}
						}
						return true;
					})();
					if (isScreenshots) {
						$elem.addClass('screenshots');
					}
					$project.append($elem);
				}
				history.pushState({}, '');
				$viewer.find('.project').remove();
				$viewer.append($project);
				$header.hide();
				$tileWrapper.hide();
				$viewer.show();
			});
		}

		// Adjust projects grid upon window resize
		this.window.on('resize', () => {
			let cols = (() => {
				if (this.window.width < 550) {
					return '1fr';
				}
				if (this.window.width < 900) {
					return '1fr 1fr';
				}
				return '1fr 1fr 1fr';
			})();
			$tiles.css('grid-template-columns', cols);
		});
	}

	static get projects () {
		return [
			{
				name: 'Portfolio',
				coverUrl: '/f/portfolio-cover.png',
				markdown: Markdown.parse(require('./project-portfolio.md')),
			},
			{
				name: 'Taffy',
				coverUrl: '/f/taffy-cover.png',
				markdown: Markdown.parse(require('./project-taffy.md')),
			},
			{
				name: 'Name My Var',
				coverUrl: '/f/nmv-cover.png',
				markdown: Markdown.parse(require('./project-nmv.md')),
			},
			{
				name: 'Videoso',
				coverUrl: '/f/videoso-cover.png',
				markdown: Markdown.parse(require('./project-videoso.md')),
			},
		];
	}
}

module.exports = ProjectsApp;
