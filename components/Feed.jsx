"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    const filteredPosts = filterPosts(e.target.value);
    setSearchedPosts(filteredPosts);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const filteredPosts = filterPosts(tagName);
    setSearchedPosts(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setAllPosts(data);
    };

    fetchPosts();
  }, []);

  const filterPosts = (searchText) => {
    const REGEX = new RegExp(searchText, "i");
    return allPosts.filter((post) => {
      return (
        REGEX.test(post.creator.username) ||
        REGEX.test(post.tag) ||
        REGEX.test(post.prompt)
      );
    });
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {!searchText ? (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
