"use client"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"


export default function List({data}: {data: any}) {
	return (
		<Table>
			<TableCaption>A Table of Todos</TableCaption>
			<TableHeader>
				<TableRow>
					{data.map((item: any) => (
						<TableHead key={item.id}>{item.id}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
				
				{data.map((item: any) => (
					<TableCell key={item.id}>{item.title}</TableCell>
				))}
				</TableRow>
			</TableBody>
		</Table>
	)

}