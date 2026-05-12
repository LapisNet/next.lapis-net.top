export const convert = (project: ProjectInfo): ProjectInfoV2 => {
	const result = {
		...project,
		name: project.sub_title? `${project.title} - ${project.sub_title}` : project.title,
		desc: [project.info1, project.info2].join('\n'),
		link: project.url,
		repo: project.repo? `https://${project.repo_type? project.repo_type : 'github.com'}/${project.repo}`: void 0,
		target: 'N/A',
		leader: {
			name: 'unknown'
		},
		next_release_at: 'N/A'
	}
	console.debug('[legacy project convert]', project, '=>', result);
	return result;
}
