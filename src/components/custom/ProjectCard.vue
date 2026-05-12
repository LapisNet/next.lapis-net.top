<script setup lang="ts">
import { BadgeInfoIcon, IdCardLanyardIcon, SquareArrowOutUpRightIcon } from 'lucide-vue-next';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { parse } from '@/lib/late-marked';
import { Button } from '../ui/button';

defineProps<{
	project: ProjectInfoV2;
}>();

const status: Record<'unknown' | 'wip' | 'normal' | 'deprecated' | 'archived', string> = {
	unknown: '未知',
	wip: '进行中',
	normal: '正常',
	deprecated: '已废弃',
	archived: '已归档',
}

const parseName = (name: ProjectInfoV2['name']) => {
	if (typeof name === 'string') return name;
	return name.previous ? `${name.current} (${name.previous})` : name.current;
}

const parseRepo = (repo: ProjectInfoV2['repo']) => {
	if (repo?.startsWith('http')) return repo;
	const parts = repo?.split(':');
	if (!parts || parts.length !== 2) return repo;
	return `https://${parts[0]}/${parts[1]}`;
}
</script>

<template>
	<Card>
		<CardHeader>
			<CardTitle>{{ parseName(project?.name) }}</CardTitle>
			<CardDescription>
				<div class="flex gap-2.5">
					<Badge variant="secondary" class="text-white select-none"
						:class="{
							'bg-blue-500': project._status === 'normal',
							'dark:bg-blue-600': project._status === 'normal',
							'bg-yellow-500': project._status === 'archived',
							'dark:bg-yellow-600': project._status === 'archived',
							'bg-red-500': project._status === 'deprecated',
							'dark:bg-red-600': project._status === 'deprecated',
							'bg-green-500': project._status === 'wip',
							'dark:bg-green-600': project._status === 'wip',
							'bg-gray-500': !project._status || project._status === 'unknown',
							'dark:bg-gray-600': !project._status || project._status === 'unknown',
						}">
							<BadgeInfoIcon /> {{ status[project._status || 'unknown'] }}
					</Badge>
					<Badge variant="secondary">
						<IdCardLanyardIcon /> {{ project.leader.name }}
					</Badge>
				</div>
			</CardDescription>
		</CardHeader>
		<CardContent>
			<p :class="{
				'text-muted-foreground': !project.desc.trim()
			}" v-html="parse(project.desc.trim() || '/未提供描述/')" />
		</CardContent>
		<CardFooter v-if="project.link || project.repo" class="border-t border-border/20 bg-sky-100 dark:bg-background/20 p-4 flex gap-4">
			<Button v-if="project.link" as-child>
				<a :href="project.link" target="_blank" rel="noopener">
					项目页面 <SquareArrowOutUpRightIcon />
				</a>
			</Button>
			<Button v-if="project.repo" as-child>
				<a :href="parseRepo(project.repo)" target="_blank" rel="noopener">
					项目仓库 <SquareArrowOutUpRightIcon />
				</a>
			</Button>
		</CardFooter>
	</Card>
</template>
