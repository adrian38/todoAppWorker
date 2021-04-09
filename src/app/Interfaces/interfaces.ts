
export interface ChatDetails {
    userID: string;
    timeStamp: number; // time_t
    isLastMessage: boolean;
    message: string;
}