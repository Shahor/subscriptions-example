module.exports = {
	paginate(itemsPerPage, items) {
		const pages = []
		const pageCount = Math.ceil(items.length / itemsPerPage)
		for (let i = 0; i < pageCount; i++) {
			const page = items.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
			pages.push(page)
		}
		return pages
	},

	*range(start, end) {
		for (start; start < end; start++) {
			yield start
		}
	},
}
