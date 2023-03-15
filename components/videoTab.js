import { useState } from "react";
import Dropdown from "react-dropdown";
import Container from "./container";
import VimeoThumbnail from "../components/vimeoThumbnail";
import "react-dropdown/style.css";

export default function VideoTab({
  videos,
  categories,
  allowedCategories,
  options,
}) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredVideos = videos.filter((video) =>
    video.categoryCollection.items.some(
      (categoryItem) => categoryItem.sys.id === selectedCategory
    )
  );

  const defaultOption = options[0];

  const allVideos = videos.filter((video) =>
    video.categoryCollection.items.some((categoryItem) =>
      options.map((option) => option.value).includes(categoryItem.sys.id)
    )
  );

  return (
    <div className="bg-black text-white py-24">
      <Container>
        <div className="block md:hidden mb-10">
          <Dropdown
            options={options}
            onChange={(val) => handleCategoryClick(val.value)}
            value={defaultOption}
            placeholder="Select an option"
            arrowClosed={
              <span className="arrow-closed">
                <img src="/chevron.png" />
              </span>
            }
            arrowOpen={
              <span className="arrow-open">
                <img src="/chevron.png" />
              </span>
            }
          />
        </div>
        <div className="flex justify-between items-start">
          <div className="categories hidden md:flex flex-col min-w-[220px]">
            <div
              key={"All"}
              className={`mb-4 cursor-pointer ${
                selectedCategory === "All" ? "text-accent-1" : ""
              }`}
              onClick={() => handleCategoryClick("All")}
            >
              ALL
            </div>
            {categories
              .filter((category) =>
                allowedCategories.includes(category.categoryText)
              )
              .map((category) => {
                return (
                  <div
                    key={category.sys.id}
                    className={`mb-4 cursor-pointer ${
                      selectedCategory === category.sys.id
                        ? "text-accent-1"
                        : ""
                    }`}
                    onClick={() => handleCategoryClick(category.sys.id)}
                  >
                    {category.categoryText.toUpperCase()}
                  </div>
                );
              })}
          </div>
          <div className="videos flex flex-wrap max-w-[900px]">
            {selectedCategory === "All" &&
              allVideos.map((video, index) => (
                <div
                  className="w-[100%] sm:w-[50%] xl:w-[33%] video-tab cursor-pointer"
                  key={index}
                >
                  <VimeoThumbnail
                    url={video.videoUrl}
                    clientName={video.clientName}
                    projectTitle={video.projectTitle}
                  />
                </div>
              ))}
            {filteredVideos.map((video, index) => (
              <div
                className="w-[100%] sm:w-[50%] lg:w-[33%] video-tab cursor-pointer"
                key={index}
              >
                <VimeoThumbnail
                  url={video.videoUrl}
                  clientName={video.clientName}
                  projectTitle={video.projectTitle}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
