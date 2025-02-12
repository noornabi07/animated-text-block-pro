const iconColor = '#4527a4';

export const animationIcon = <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 195 195'>
	<path fill={`${iconColor}33`} d='M40.4 53.2C25.6 64.3 17.9 79.5 17.9 97.5C17.9 104.9 18.4 108.5 20.5 114.5C24.2 125.7 30.6 134.4 40.5 141.9L43.5 144.2L39 143.5C12.7 139.2 -5.1 112.1 1.5 86.5C5.9 69.8 19.7 55.9 35.7 52.1C42.5 50.5 43.6 50.7 40.4 53.2Z' />
	<path fill={`${iconColor}66`} d='M65.4 53.2C50.6 64.3 42.9 79.5 42.9 97.5C42.9 104.9 43.4 108.5 45.5 114.5C49.2 125.7 55.6 134.4 65.5 141.9L68.5 144.2L64 143.5C37.7 139.2 19.9 112.1 26.5 86.5C30.9 69.8 44.7 55.9 60.7 52.1C67.5 50.5 68.6 50.7 65.4 53.2Z' />
	<path fill={`${iconColor}99`} d='M91.4 53.2C76.6 64.3 68.9 79.5 68.9 97.5C68.9 104.9 69.4 108.5 71.5 114.5C75.2 125.7 81.6 134.4 91.5 141.9L94.5 144.2L90 143.5C63.7 139.2 45.9 112.1 52.5 86.5C56.9 69.8 70.7 55.9 86.7 52.1C93.5 50.5 94.6 50.7 91.4 53.2Z' />
	<path fill={`${iconColor}cc`} d='M116.4 53.2C101.6 64.3 93.9 79.5 93.9 97.5C93.9 104.9 94.4 108.5 96.5 114.5C100.2 125.7 106.6 134.4 116.5 141.9L119.5 144.2L115 143.5C88.7 139.2 70.9 112.1 77.5 86.5C81.9 69.8 95.7 55.9 111.7 52.1C118.5 50.5 119.6 50.7 116.4 53.2Z' />
	<path fill={iconColor} d='M161.9 52.9C177.8 57.8 190.5 71.8 193.9 87.8C199.9 116.6 177.8 144.1 148.7 144C134.9 143.9 124.9 139.9 115.4 130.5C96.7 111.9 96.7 83 115.4 64.5C121.7 58.3 128.2 54.5 136 52.4C142.9 50.5 154.9 50.7 161.9 52.9Z' />
</svg>;

export function LeftDownArrow(props) {
	return <svg xmlns="http://www.w3.org/2000/svg" {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-corner-left-down"><polyline points="14 15 9 20 4 15" /><path d="M20 4h-7a4 4 0 0 0-4 4v12" /></svg>
}

export function ListIcon(props) {
	return <svg xmlns="http://www.w3.org/2000/svg" {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><path d="M3 12h.01" /><path d="M3 18h.01" /><path d="M3 6h.01" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M8 6h13" /></svg>
}

export function Sparkles(props) {
	return <svg xmlns="http://www.w3.org/2000/svg" {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" /></svg>
}

export function BsArrowBarDown(props) {
	return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 16 16" height="24" width="24" {...props}><path fillRule="evenodd" d="M11.354 10.146a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 01.708-.708L8 12.793l2.646-2.647a.5.5 0 01.708 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M8 6a.5.5 0 01.5.5V13a.5.5 0 01-1 0V6.5A.5.5 0 018 6zM2 3.5a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clipRule="evenodd" /></svg>;
}

export function FaArrowDown(props) {
	return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 448 512" height="30" width="30" {...props}><path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z" /></svg>;
}


export function AiOutlineArrowDown(props) {
	return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 1024 1024" height="20" width="20" {...props}><path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0 0 48.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" /></svg>;
}
