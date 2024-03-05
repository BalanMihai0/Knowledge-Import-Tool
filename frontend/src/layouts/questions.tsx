import Sidebar from "./sidebar";
import Logo from "../assets/iqadot_logo_small_transparent.png"
import { useEffect, useState } from "react"
import axios from "axios";
import config from "../../config.json"
import Background from "../assets/BackgroundWebsite.jpg"

function Questions() {
    type StaticItem = {
        item: string,
        subject: string,
        timestamp: number
    }

    const [selectedChannel, setSelectedChannel] = useState("ee3ee753-af36-f243-27f1-615ee58e4f5a");
    const [questions, setQuestions] = useState<StaticItem[]>([]);

    useEffect(() => {
        const reqObj = {
            "channel": selectedChannel
        }
        axios.post(`${config.localhost}/iqadot/getChannel1`, reqObj)
            .then((response) => {
                console.log(response.data)
                setQuestions(response.data.data.items);
            })
    }, [selectedChannel])

    const channels : {[key: string]: string} = {
        "Group Autumn 1": "ee3ee753-af36-f243-27f1-615ee58e4f5a",
        "Group Autumn 2": "d3ba02da-7aff-bcca-ab6b-97310dffb80a"
    };

    const handleChannelChange = (e: any) => {
        setSelectedChannel(e.target.value);
    }

    return (
        <div>
            <div
        className=""
        style={{
          backgroundImage: `url(${Background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '100vh',
        }}>
            <Sidebar></Sidebar>
            <a href="https://iqadot.com">
                <img className="fixed top-0 right-0 w-52 " src={Logo} />
            </a>
            <div className="p-4 min-h-screen flex sm:ml-64">
                <form className="justify-self-center self-center m-auto">
                    <div className="flex flex-col mt-5">
                        <label className="text-lg font-semibold" htmlFor="select-channel">Select Channel</label>
                        <select className="rounded-xl mt-3" name="select-channel" onChange={handleChannelChange}>
                            {Object.keys(channels).map((channel) => (
                                <option key={channels[channel]} value={channels[channel]}>
                                    {channel}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mt-5">
                        <label className="text-lg font-semibold" htmlFor="select-question">Select Question</label>
                        <select className="rounded-xl mt-3" name="select-question">
                            {questions ? (
                            questions.map((question: StaticItem) => (
                                <option key={question.item} value={question.item}>
                                    {question.subject}
                                </option>
                            ))) : null}                      
                        </select>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Questions;