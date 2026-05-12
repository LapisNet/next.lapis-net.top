<script setup lang="ts">
import { LinkIcon, SquareArrowOutUpRightIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';
</script>

<template>
	<Empty>
		<EmptyHeader>
			<EmptyMedia variant="icon">
				<LinkIcon />
			</EmptyMedia>
			<EmptyTitle>重定向</EmptyTitle>
			<EmptyDescription>
				<p>你要前往的页面与 LapisNet 没有任何关联，注意安全风险。</p>
				<p>
					是否继续前往
					<code class="p-1 border border-gray-300 dark:border-gray-700 rounded-sm">
						{{ $route.query.url?.toString() }}
					</code>
					？
				</p>
			</EmptyDescription>
		</EmptyHeader>
		<EmptyContent>
			<div class="flex gap-2">
				<Button @click="$router.back()">返回</Button>
				<Button as-child variant="outline">
					<a :href="decodeURIComponent($route.query.url?.toString() || '')" target="_blank"
						rel="noopener">
						继续前往 <SquareArrowOutUpRightIcon />
					</a>
				</Button>
			</div>
		</EmptyContent>
	</Empty>
</template>
