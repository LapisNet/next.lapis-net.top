const trustedHosts = [
	'github.com',
	'lapisnet.github.io',
	'*.lapis-net.top'
];

const listener = (e: MouseEvent, router: import('vue-router').Router) => {
	if(e.button !== 0 || router.currentRoute.value.name === 'redirect') return;
	const target = (e.target as HTMLElement).closest('a');
	if(!target || target.target !== '_blank') return;

	const url = new URL(target.href);
	if(trustedHosts.some(host => {
		const reg = new RegExp(host.replace(/\./g, '\\.').replace(/\*/g, '[^.]*'));
		return reg.test(url.hostname);
	})) return;
	else {
		e.preventDefault();
		e.stopPropagation();

		router.push({
			name: 'redirect',
			query: {
				url: url.href,
			}
		});
	}
}

export const init = (router: import('vue-router').Router) => {
	document.body.addEventListener('click', (e) => listener(e, router));
}

export const destroy = (router: import('vue-router').Router) => {
	document.body.removeEventListener('click', (e) => listener(e, router));
}
