import React from 'react';
import { Card, CardHeader, CardContent, Skeleton } from '@mui/material';
function SkeletonLoader() {
	return (
		<div style={{ width: '100%' }}>
			<Card sx={{ width: '100%', marginBottom: 2, marginTop: 2 }}>
				<CardHeader
					avatar={
						<Skeleton
							animation='wave'
							variant='circular'
							width={40}
							height={40}
						/>
					}
					action={null}
					title={
						<Skeleton
							animation='wave'
							height={10}
							width='80%'
							style={{ marginBottom: 6 }}
						/>
					}
					subheader={
						<Skeleton animation='wave' height={10} width='40%' />
					}
				/>
				<Skeleton
					sx={{ height: 400 }}
					animation='wave'
					variant='rectangular'
				/>

				<CardContent>
					<div>
						<Skeleton
							animation='wave'
							height={10}
							style={{ marginBottom: 6 }}
						/>
						<Skeleton animation='wave' height={10} width='80%' />
					</div>
				</CardContent>
			</Card>
			<Card sx={{ width: '100%' }}>
				<CardHeader
					avatar={
						<Skeleton
							animation='wave'
							variant='circular'
							width={40}
							height={40}
						/>
					}
					action={null}
					title={
						<Skeleton
							animation='wave'
							height={10}
							width='80%'
							style={{ marginBottom: 6 }}
						/>
					}
					subheader={
						<Skeleton animation='wave' height={10} width='40%' />
					}
				/>
				<Skeleton
					sx={{ height: 400 }}
					animation='wave'
					variant='rectangular'
				/>

				<CardContent>
					<div>
						<Skeleton
							animation='wave'
							height={10}
							style={{ marginBottom: 6 }}
						/>
						<Skeleton animation='wave' height={10} width='80%' />
					</div>
				</CardContent>
			</Card>
		</div>
	);
}

export default SkeletonLoader;
