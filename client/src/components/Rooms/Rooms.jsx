import { useEffect, useState } from "react";
import Card from "./Card";
import Container from "../Shared/Container";
import { useSearchParams } from "react-router-dom";
import Heading from "../Shared/Heading";

const Rooms = () => {
    const [rooms, setRooms] = useState([]);

    const [params, setParams] = useSearchParams();
    const category = params?.get("category");
    // console.log(category);

    useEffect(() => {
        fetch("rooms.json")
            .then((res) => res.json())
            .then((data) => {
                if (category) {
                    const filtered = data.filter(
                        (room) => room?.category === category
                    );
                    setRooms(filtered);
                } else {
                    setRooms(data);
                }
            });
    }, [category]);
    // console.log(rooms);

    return (
        <Container>
            {rooms && rooms?.length > 0 ? (
                <div className=" pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                    {rooms?.map((room) => (
                        <Card key={room?._id} room={room} />
                    ))}
                </div>
            ) : (
                <Heading></Heading>
            )}
        </Container>
    );
};

export default Rooms;
