export const scrollToTop = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
	if (e?.ctrlKey) return;

	const body = document.querySelector('#root') as Element;
	body.scrollIntoView();
};
