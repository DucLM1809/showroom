import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
  StyledImage,
} from "../components/styled";
import { useSelector } from "react-redux";
import { RootState } from "../../../slices/rootReducer";
import axios from "axios";

interface AnnualReports {
  fiscalDateEnding: string;
  grossProfit: string;
  reportedCurrency: string;
}

interface Transactions {
  symbol: string;
  annualReports: AnnualReports[];
}

const TransactionManage = () => {
  const users = useSelector((state: RootState) => state.user.users);
  const [transactions, setTransactions] = useState<Transactions | undefined>(
    undefined
  );
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo"
      );
      const data = response.data;
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchData();

  const CardTransactions = ({
    transaction,
  }: {
    transaction: AnnualReports;
  }) => {
    return (
      <TouchableOpacity>
        <StyledView className="flex flex-row">
          <StyledImage
            source={{
              uri: "https://play-lh.googleusercontent.com/n109V9dur2NFwV7Fbr8lwlU-isXRR0K7Q-pvp1LCyRwTVP2DfJaR-dklmXzK0MhQuz9E=w240-h480-rw",
            }}
            className="w-16 h-16 rounded-3xl align-middle mt-5 mb-2 "
          />
          <StyledView className="flex justify-center mx-5 basis-3/7">
            <StyledText className="text-lg font-semibold">
              Mercedes-Benz
            </StyledText>
            <StyledView>
              <StyledText>{transaction?.fiscalDateEnding}</StyledText>
            </StyledView>
          </StyledView>
          <StyledView className="flex justify-center ">
            <StyledText
              numberOfLines={1}
              className="text-xl font-semibold w-[80%] truncate ... pl-5"
            >
              ${transaction?.grossProfit}
            </StyledText>
          </StyledView>
        </StyledView>
      </TouchableOpacity>
    );
  };

  return (
    <StyledView className="w-[90%] m-[5%] flex-1">
      <StyledText className="text-xl font-bold pt-4">
        {" "}
        Currently Users
      </StyledText>
      <ScrollView horizontal>
        {users.map((user) => (
          <StyledView className="items-center mr-8 mb-6">
            <StyledImage
              source={{
                uri: "https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/322115926_1204139193874845_7113739806147074311_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=IGJi6I88w_8AX_Q8iFL&_nc_ht=scontent.fsgn8-4.fna&oh=00_AfDBM1tnOOCUdAtAm_SWmr318JP7oNtHGKc8gGISpRo9bA&oe=649E546A",
              }}
              className="w-20 h-20 rounded-xl align-middle  mt-5 mb-2 "
            />
            <StyledText numberOfLines={1} className="font-medium">
              {user.username}
            </StyledText>
          </StyledView>
        ))}
      </ScrollView>
      <StyledText className="text-xl font-bold pt-4"> Transactions</StyledText>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {transactions?.annualReports.map((report) => {
          return <CardTransactions transaction={report} />;
        })}
      </ScrollView>
    </StyledView>
  );
};

export default TransactionManage;
