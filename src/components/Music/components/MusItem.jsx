import { useRef, useState } from 'react'
import c from '../css/music.module.css'

const MusItem = ({ nameTrack, srcFile, srcPhoto }) => {
	const audio = useRef(null)
	let [isPlay, setIsPlay] = useState(false)
	let [time, setTime] = useState(false)
	let [currentTime, setCurrentTime] = useState(0)

	const handlerPlay = () => {
		isPlay ? audio.current.pause() : audio.current.play()
		console.log(Math.floor(audio.current.duration % 60))
		console.log(Math.floor(audio.current.duration / 60))
		const min = Math.floor(audio.current.duration / 60)
		const sec = Math.floor(audio.current.duration % 60)
		setTime(time = `${min}:${sec}`)


		setIsPlay(isPlay = !isPlay)
	}
	const currentTimeF = e => {
		setCurrentTime(currentTime = e.target.value)
		audio.current.currentTime = currentTime
	}

	return (
		<div className={c.musItem}>
			<img src={`${srcPhoto ? `${`https://glacial-forest-97928.herokuapp.com/` + srcPhoto}` : "https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"}`} alt="musImg" height='50px' width='50px' className={c.PhotoMus} />
			<div className={c.contentP}>
				<p className={c.nameMus}>{nameTrack}</p>
				<div className={c.item}>
					<div className={c.desc}>
						<audio ref={audio} onTimeUpdate={() => setCurrentTime(currentTime = Math.floor(audio.current.currentTime))} src={srcFile}></audio>
						<p className={c.allTime}>{time ? time : '0:00'}</p>
						<p className={c.currentTime}>{currentTime === 0 ? '0:00' : audio.current ? `${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60) < 10 ? `0${Math.floor(currentTime % 60)}` : Math.floor(currentTime % 60)}` : ''}</p>
						<button className={c.pause} onClick={() => handlerPlay()}> {isPlay ? '||' : '>'}</button>
						<input type='range' value={currentTime} max={audio.current ? Math.floor(audio.current.duration) : ''} onChange={(e) => currentTimeF(e)} className={c.valutInput} />
					</div>
				</div>


			</div>

		</div>
	)
}
export default MusItem