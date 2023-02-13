import React, { useEffect, useRef } from 'react';
import Button from './Button';
import Laps from './Laps';
import Timer from './Timer';
import useTimer from './../hooks/useTimer';

function Stopwatch() {
    const { start, pause, centisecond, isRunning, createLap, laps, reset } =
        useTimer();

    const lapResetBtnRef = useRef(null);
    const startStopBtnRef = useRef(null);
    const handler = (e) => {
        if (e.code === 'keyL') {
            lapResetBtnRef.current.click();
        }
        if (e.code === 'keyS') {
            startStopBtnRef.current.click();
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, []);
    return (
        <section className="w-fit bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col justify-center m-auto mt-36 max-w-sm">
            <Timer centisecond={centisecond} />
            <div className="flex justify-between text-white pb-8 text-sm select-none">
                <Button
                    label={isRunning ? '랩' : '리셋'}
                    code="L"
                    color="bg-gray-600"
                    onClickHandler={isRunning ? createLap : reset}
                    ref={lapResetBtnRef}
                />
                <Button
                    label={isRunning ? '중단' : '시작'}
                    code="S"
                    color={isRunning ? 'bg-red-600' : 'bg-green-600'}
                    onClickHandler={isRunning ? pause : start}
                    ref={startStopBtnRef}
                />
            </div>
            <Laps laps={laps} />
        </section>
    );
}

export default Stopwatch;
