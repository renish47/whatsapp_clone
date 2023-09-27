import { FC, useState, useRef, useEffect } from "react";
import { BsCheck, BsCheckAll } from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi";

interface MessageStatusProps {
  status: string;
}

const MessageStatus: FC<MessageStatusProps> = ({ status }) => {
  const [state, setState] = useState(status);
  const prevStatusRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevStatusRef.current !== status) {
      setState(() => (prevStatusRef.current === "read" ? "read" : status));
      prevStatusRef.current = status;
    }
  }, [status]);

  return (
    <>
      {state === "sending" && (
        <HiOutlineClock className="mx-[2px] text-xs font-semibold" />
      )}
      {state === "sent" && <BsCheck className="text-base" />}
      {state === "delivered" && <BsCheckAll className="text-base" />}
      {state === "read" && <BsCheckAll className="text-base text-icon-ack" />}
    </>
  );
};

export default MessageStatus;
