export const scrollToTop = () => {
	const body = document.querySelector('#root') as Element;
	body.scrollIntoView();
};
