"use client";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  FaMicrophone,
  FaPauseCircle,
  FaPlay,
  FaStop,
  FaTrash,
} from "react-icons/fa";
import IconWrapper from "../../components/Common/IconWrapper";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { selectUser } from "@/redux/features/userSlice";
import { MdSend } from "react-icons/md";
import WaveSurfer from "wavesurfer.js";
import { Stream } from "stream";

interface CaptureAudioProps {
  setShowAudioRecorder: Dispatch<SetStateAction<boolean>>;
}

const CaptureAudio: FC<CaptureAudioProps> = ({ setShowAudioRecorder }) => {
  const { currentChatUserInfo, socket, userInfo } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<HTMLAudioElement | null>(
    null
  );
  const [renderedAudio, setRenderedAudio] = useState<File | null>(null);
  const [waveForm, setWaveForm] = useState<WaveSurfer>();
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [currenPlaybackTime, setCurrenPlaybackTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<any>(null);
  const mediaRecorderRef = useRef<any>(null);
  const waveformRef = useRef(null);

  const playAudioHandler = () => {
    if (recordedAudio) {
      waveForm?.stop();
      waveForm?.play();
      recordedAudio?.play();
      setIsPlaying(true);
    }
  };
  const pauseAudioHandler = () => {
    waveForm?.stop();
    recordedAudio?.pause();
    setIsPlaying(false);
  };
  const startRecordingHandler = () => {
    setRecordingDuration(0);
    setCurrenPlaybackTime(0);
    setTotalDuration(0);
    setIsRecording(true);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioRef.current.srcObject = stream;

        const chucks: BlobPart[] | undefined = [];
        mediaRecorder.ondataavailable = (e) => chucks.push(e.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(chucks, { type: "audio/ogg; codecs=opus" });
          const audioURL = URL.createObjectURL(blob);
          const audio = new Audio(audioURL);
          setRecordedAudio(audio);
          waveForm?.load(audioURL);
        };
        mediaRecorder.start();
      })
      .catch((error) => {
        console.log("Error Accessing Microphone", error);
      });
  };
  const pauseRecordingHandler = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      waveForm?.stop();

      const audioChucks: any[] | undefined = [];
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        (event: { data: any }) => {
          audioChucks.push(event?.data);
        }
      );

      mediaRecorderRef.current.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChucks, { type: "audio/mp3" });
        const audioFile = new File([audioBlob], "recording.mp3");
        setRenderedAudio(audioFile);
      });
    }
  };
  const sendRecordingHandler = async () => {};

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (recordedAudio) {
      const updatePlaybackTime = () => {
        setCurrenPlaybackTime(recordedAudio.currentTime);
      };
      recordedAudio.addEventListener("timeupdate", updatePlaybackTime);
      return () => {
        recordedAudio.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }
  }, [recordedAudio]);

  useEffect(() => {
    let interval: string | number | NodeJS.Timer | undefined;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => {
          setTotalDuration(prevDuration + 1);
          return prevDuration + 1;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRecording]);

  useEffect(() => {
    const waveSurfer: WaveSurfer = WaveSurfer.create({
      container: waveformRef.current as unknown as HTMLDivElement,
      waveColor: "#ccc",
      progressColor: "#4a9eff",
      cursorColor: "#7ae3c3",
      barWidth: 2,
      height: 30,
      responsive: true,
    });
    setWaveForm(waveSurfer);

    waveSurfer.on("finish", () => {
      setIsPlaying(false);
    });

    return () => {
      waveSurfer.destroy();
    };
  }, []);

  useEffect(() => {
    if (waveForm) startRecordingHandler();
  }, [waveForm]);

  return (
    <section className=" flex w-full items-center justify-end text-2xl">
      <IconWrapper onClick={() => setShowAudioRecorder(false)}>
        <FaTrash className=" pt-1 text-panel-header-icon" />
      </IconWrapper>
      <div className=" mx-4 flex items-center justify-center gap-3 rounded-full bg-ui-components px-4 py-2 text-lg text-white drop-shadow-lg">
        {isRecording ? (
          <div className=" w-60 animate-pulse text-center text-red-500">
            Recording <span>{recordingDuration}s</span>
          </div>
        ) : (
          <div>
            {recordedAudio &&
              (!isPlaying ? (
                <IconWrapper onClick={playAudioHandler}>
                  <FaPlay title="Play" />
                </IconWrapper>
              ) : (
                <IconWrapper onClick={pauseAudioHandler}>
                  <FaStop title="Pause" />
                </IconWrapper>
              ))}
          </div>
        )}
        <div className="w-60" ref={waveformRef} hidden={isRecording} />
        {recordedAudio && isPlaying && (
          <span>{formatTime(currenPlaybackTime)}</span>
        )}
        {recordedAudio && !isPlaying && (
          <span>{formatTime(totalDuration)}</span>
        )}
        <audio ref={audioRef} hidden />
        <div className="mr-4 ">
          {!isRecording ? (
            <IconWrapper onClick={startRecordingHandler}>
              <FaMicrophone className="text-red-500" title="Start Recording" />
            </IconWrapper>
          ) : (
            <IconWrapper onClick={pauseRecordingHandler}>
              <FaPauseCircle title="Pause Recording" />
            </IconWrapper>
          )}
        </div>
        <IconWrapper>
          <MdSend title="send" onClick={sendRecordingHandler} />
        </IconWrapper>
      </div>
    </section>
  );
};

export default CaptureAudio;
