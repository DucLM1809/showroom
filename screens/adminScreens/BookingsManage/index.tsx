import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useTheme } from "@react-navigation/native";
import { updateBookingStatus, useGetBookings } from "../../../hooks/useAdmin";
import { StyledText, StyledView, StyledImage } from "../components/styled";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { Divider } from "@react-native-material/core";
import { STATUS } from "./constants";
import Popover, { PopoverPlacement } from "react-native-popover-view";
const BookingsManage = ({ navigation }) => {
  const { colors } = useTheme();

  interface User {
    email: string;
    lastName: string;
    firstName: string;
    fullName: string;
    avatarUrl: string;
  }

  interface Booking {
    id: string;
    userId: string;
    user: User;
    postId: string;
    expectedVisitAt: any;
    note: string;
    status: "CONFIRMED" | "PENDING" | "CANCELED";
  }

  const [bookings, setBookings] = useState<Booking[]>([]);

  const { response, error } = useGetBookings();

  useEffect(() => {
    if (response) {
      setBookings(response);
    }
  }, [response]);

  const currentBookingId = useRef(null);

  const handleUpdateBookingStatus = async (status) => {
    try {
      const id = currentBookingId.current;
      await updateBookingStatus(id, status);

      const updatedBookings = bookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error updating booking status:", error);
    }
  };

  const getDate = (time) => {
    const date = new Date(time);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getHour = (time) => {
    const date = new Date(time);
    const hour = date.getHours();
    return `${hour}:00`;
  };

  const TicketBooking = ({ booking }: { booking: Booking }) => {
    const [showPopover, setShowPopover] = useState(false);

    return (
      <StyledView className="bg-white rounded-2xl  m-4 p-5 ">
        <StyledView className="flex flex-row mb-2 ml-1">
          <StyledImage
            className="h-16 w-16 rounded-xl"
            source={{
              uri: booking.user.avatarUrl
                ? booking.user.avatarUrl
                : "https://img.freepik.com/free-icon/user_318-159711.jpg?w=2000",
            }}
            resizeMode="cover"
          />
          <StyledView className="mx-5 justify-center basis-3/5">
            <StyledText className=" text-xl">
              {booking.user.fullName ? booking.user.fullName : "Anonymous"}
            </StyledText>
            <StyledText className="text-slate-500">User</StyledText>
          </StyledView>
          <StyledView className="justify-center ">
            <Popover
              isVisible={showPopover}
              placement={PopoverPlacement.LEFT}
              arrowSize={{ width: 0, height: 0 }}
              from={
                <TouchableOpacity
                  onPress={() => {
                    setShowPopover(true);
                    currentBookingId.current = booking.id;
                  }}
                >
                  <Entypo
                    name="dots-three-vertical"
                    style={{
                      fontSize: 18,
                    }}
                  />
                </TouchableOpacity>
              }
            >
              <StyledView>
                <StatusOption
                  id={booking.id}
                  handleChange={() => {
                    setShowPopover(false);
                  }}
                />
              </StyledView>
            </Popover>
          </StyledView>
        </StyledView>
        <Divider />
        <StyledView className="flex flex-row mt-2">
          <StyledView className="flex flex-row mr-3">
            <StyledView className="">
              <EvilIcons
                name="calendar"
                style={{
                  fontSize: 35,
                  color: "#ffe203",
                }}
              />
            </StyledView>
            <StyledView className="justify-center">
              <StyledText className="text-base font-semibold">
                {getDate(booking?.expectedVisitAt)}
              </StyledText>
            </StyledView>
          </StyledView>
          <StyledView className="flex flex-row mr-3">
            <StyledView className="">
              <EvilIcons
                name="clock"
                style={{
                  fontSize: 35,
                  color: "#ffe203",
                }}
              />
            </StyledView>
            <StyledView className="justify-center">
              <StyledText className="text-base font-semibold">
                {getHour(booking?.expectedVisitAt)}
              </StyledText>
            </StyledView>
          </StyledView>
          <StyledView className="flex flex-row">
            <Entypo
              name="dot-single"
              style={{
                fontSize: 35,
                color:
                  booking.status == "CONFIRMED"
                    ? "green"
                    : booking.status == "PENDING"
                    ? "yellow"
                    : "red",
                marginRight: -5,
              }}
            />
            <StyledView className="justify-center">
              <StyledText className="text-base font-semibold">
                {booking?.status}
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>
    );
  };

  const StatusOption = ({ id, handleChange }) => {
    return (
      <StyledView className="">
        {Object.values(STATUS).map((status) => {
          const bookingFound = bookings.find((booking) => booking.id === id);

          return (
            <TouchableOpacity
              onPress={() => {
                handleChange();
                handleUpdateBookingStatus(status.value);
              }}
              disabled={bookingFound.status === status.value}
            >
              <StyledView
                className={`${
                  bookingFound.status === status.value
                    ? `bg-slate-400`
                    : `bg-white`
                } px-2 py-2`}
              >
                <StyledText className="">{status.label}</StyledText>
              </StyledView>
            </TouchableOpacity>
          );
        })}
      </StyledView>
    );
  };

  return (
    <ScrollView>
      {bookings?.map((booking) => {
        return <TicketBooking booking={booking} />;
      })}
    </ScrollView>
  );
};

export default BookingsManage;
