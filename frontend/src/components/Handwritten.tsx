import React from 'react';

const Handwritten = (props:{id: string, text:string}) => {

    let seed = 1;

    function random() {
        let x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    const randomFont = () => {
        const fonts = ["font-hand-1", "font-hand-2", "font-hand-3"];
        return fonts[Math.floor(random()*fonts.length)];
    };
    if (props.text.length > 0) {
        const chars = props.text.split('');
        return (
            <div id={props.id}>
        {chars.map((c, index) => (
            <span key={index} className={randomFont()}>{c}</span>
        ))}
        </div>
    )
    } else {
        return <div id={props.id}/>
    }
};

export default Handwritten