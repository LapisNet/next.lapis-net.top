<script setup lang="ts">
import { SquareArrowOutUpRightIcon } from 'lucide-vue-next';
import { Button } from '@/components/ui/button';
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty';

const goBack = () => history.back();
</script>

<template>
	<Empty>
		<EmptyHeader>
			<EmptyMedia>
				<div>
					<img src="/assets/images/NotFound.webp" alt="NotFound" />
					<small class="text-muted-foreground text-sm mt-2 italic">
						Logo by
						<a class="underline" href="https://github.com/SAWARATSUKI" target="_blank" rel="noopener">
							SAWARATSUKI
						</a>
					</small>
				</div>
			</EmptyMedia>
			<EmptyTitle>404 Not Found</EmptyTitle>
			<EmptyDescription>
				<p>你要查看的页面不见啦！可能已被删除或移动。</p>
			</EmptyDescription>
		</EmptyHeader>
		<EmptyContent>
			<div class="flex gap-2">
				<Button @click="goBack" variant="outline">返回上一页</Button>
				<Button @click="$router.push('/')">返回首页</Button>
			</div>
		</EmptyContent>
	</Empty>
</template>
