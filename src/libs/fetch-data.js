import json5 from 'json5';

const baseUrl = import.meta.env.DEV? 'https://lapis-net.top/.public_data/': '/.public_data/';

const dataNames = {
	news: 'news.txt',
	members: 'members.json5',
	projects: 'projects.json5',
	projects_v2: 'projects2.json5',
	contacts: 'contacts.json5',
	links: 'links.json5',
}

/**
 * 
 * @param {DataName} name data name
 * @returns {DataReturns} fetched data
 */
export const fetchData = async(name) => {
	if(name === 'news' || name === 'projects') console.warn(`[Deprecation Warning] Fetching "${name}" from fetchData is deprecated and will be removed in future versions. Please migrate to the new data source.`);
	if(!dataNames[name]) throw new Error(`Data "${name}" is not defined in fetchData.`);
	const res = await fetch(baseUrl + dataNames[name]);
	return name === 'news'? await res.text(): json5.parse(await res.text());
}
