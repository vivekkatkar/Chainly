"use client"
export default function HeroVideo (){
    return <div className="flex justify-center pt-10">
        <video className="max-w-4xl"  controls={false} muted autoPlay
        src="https://res.cloudinary.com/zapier-media/video/upload/q_auto:best,f_auto/v1745864783/aiworkflowshomepage.mp4" />
    </div>
}