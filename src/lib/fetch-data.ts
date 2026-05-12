import * as jsonc from 'jsonc-parser';

const baseUrl =
'https://cdn.jsdelivr.net/gh/LapisNet/.public_data/';

const dataMap: Record<DataName, string> = {
	news: 'news.txt',
	members: 'members.json',
	projects: 'projects.json',
	projects_v2: 'projects2.jsonc',
	contacts: 'contacts.json',
	links: 'links.json',
}

type DataName = 'news' | 'members' | 'projects' | 'projects_v2' | 'contacts' | 'links';
type DataReturns = string | MemberInfo[] | ProjectInfo[] | ProjectInfoV2[];

export default async <T extends DataReturns>(name: DataName): Promise<T> => {
	if(name === 'news' || name === 'projects') console.warn(`[Deprecation Warning] Fetching "${name}" from fetchData is deprecated and will be removed in future versions. Please migrate to the new data source.`);
	if(!dataMap[name]) throw new Error(`Data "${name}" is not defined in fetchData.`);
	const res = await fetch(baseUrl + dataMap[name]);
	return name === 'news'? await res.text() as T: jsonc.parse(await res.text());
}
