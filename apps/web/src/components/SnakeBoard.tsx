import { useEffect, useRef } from "react"

export const SnakeBoard = () => {
    const animationRef = useRef<number | null>(null)
    const canvasRef = useRef(null)

    const fillSnake = (time: number) => {
        // const ctx = canvasRef.current.getContext("2D");
        // if(ctx) {
        //     ctx.fillRect(20,20,20,20)
        // }
    }
    useEffect(() => {
        animationRef.current = requestAnimationFrame(fillSnake);
        return () => {
            if(animationRef.current) cancelAnimationFrame(animationRef.current)
            }
    }, [])
    return <div>
        <canvas style={{backgroundColor: "black"}} ref={canvasRef} />

    </div>
}