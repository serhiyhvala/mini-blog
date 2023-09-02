export const convertData = (date: string) => {
	return new Date(date).toLocaleDateString('en-US')
}
