
const VideoIframe = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <div className="col-span-1 lg:col-span-2">
      <div className="relative w-full aspect-video rounded-md overflow-hidden">
        {videoUrl && (
          <iframe
            src={videoUrl}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        )}
      </div>
    </div>
  );
};

export default VideoIframe;
