"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import download from "@public/assets/icons/download.png";

const ClientsImg = ({ img, userId, classes }) => {
  const [isLiked, setIsLiked] = useState(null);

  const imgName = (path) => {
    const pathParts = path.split("/");
    const namePart = pathParts[pathParts.length - 1];
    const imageName = namePart.split(".");
    return imageName[imageName.length - 2];
  };

  useEffect(() => {
    // Fetch favorited images when the component mounts
    const fetchFavoritedImages = async () => {
      try {
        const response = await fetch(`/api/favorite/${userId}`);
        if (response.ok) {
          const favorite = await response.json();
          setIsLiked(favorite);
        } else {
          console.error(
            "Error fetching favorited images:",
            response.statusText
          );
          setIsLiked([]);
        }
      } catch (error) {
        console.error("Error fetching favorited images:", error);
        setIsLiked([]);
      }
    };

    fetchFavoritedImages();
  }, [userId]);

  const toggleLike = async () => {
    try {
      const response = await fetch(`/api/favorite/${img.id}/${userId}`, {
        method: isLiked && isLiked.includes(img.id) ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setIsLiked((prevLikes) => {
          // Toggle the like status only for the clicked image
          if (prevLikes.includes(img.id)) {
            return prevLikes.filter((id) => id !== img.id);
          } else {
            return prevLikes ? [...prevLikes, img.id] : [img.id];
          }
        });
     
      } else {
        console.error(
          "Error updating liked status in the database:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error updating liked status:", error);
    }
  };

  const handleClick = async () => {
    const path = img.img_path.split("/");
    const pathName = path[path.length - 1];
    try {
      const response = await fetch(`/api/download/${path}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(pathName);
      if (response.ok) {
        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = pathName;
        link.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error(
          "Error downloading image. Server responded with:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className={classes.img_frame}>
      <span className={classes.client_title}>
        {imgName(img.img_path)}
        <span
          className={`fa fa-heart${
            isLiked && isLiked.includes(img.id) ? "" : "-o"
          } fa-lg`}
          aria-hidden="true"
          onClick={toggleLike}
        ></span>
      </span>
     
      <img src={img.img_path} alt={imgName(img.img_path)} />
  
      <button type="button" onClick={handleClick}>
        <Image
          src={download}
          alt="download-button"
        />
      </button>
    </div>
  );
};

export default ClientsImg;
