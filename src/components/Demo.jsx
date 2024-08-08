import React, { useState, useEffect } from "react";

import { copy, linkIcon, loader, tick } from "../assets";
import { useLazyGetSummaryQuery } from "../services/article";

const Demo = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);
  const [copied, setCopied] = useState("");

  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
        (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    try {
        const { data } = await getSummary({ articleUrl: article.url });
        console.log("API Response:", data); // Log the entire response

        if (data && data.summary) {
            const newArticle = { ...article, summary: data.summary };
            setArticle(newArticle);
            setAllArticles([newArticle, ...allArticles]);
            localStorage.setItem("articles", JSON.stringify([newArticle, ...allArticles]));
        } else {
            throw new Error("No summary data returned.");
        }
    } catch (err) {
        console.error("An error occurred:", err.message);
        alert("Failed to fetch the summary. Please try again later.");
    }
};


  

  // copy the url and toggle the icon for user feedback
  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <section className='mt-16 w-full max-w-full'>
      {/* Search */}
      <div className='flex flex-col w-[60%] gap-2 mx-auto'>
        <form
          className='relative flex justify-center items-center'
          onSubmit={handleSubmit}
        >
          <img
            src={linkIcon}
            alt='link-icon'
            className='absolute left-0 my-2 ml-3 w-5'
          />

          <input
            type='url'
            placeholder='Please paste your Article Link Here ...'
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            onKeyDown={handleKeyDown}
            required
            className='url_input focus:border-0 ' // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
          />
          <button
            type='submit'
            className='submit_btn peer-focus:text-gray-700 hover:border-0'
          >
            <p className="border-none ">Enter</p>
          </button>
        </form>

        {/* Browse History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
          {allArticles.reverse().map((item, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt={copied === item.url ? "tick_icon" : "copy_icon"}
                  className='w-[40%] h-[40%] object-contain'
                />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Result */}
      <div className='my-12 max-w-full flex flex-col items-center w-[100%]'>
  {isFetching ? (
    <div className='flex items-center justify-center'>
      <img src={loader} alt='Loading...' className='w-16 h-16 object-contain' />
    </div>
  ) : error ? (
    <div className='text-center p-4 bg-red-100 border border-red-300 rounded-md'>
      <p className='text-lg font-semibold text-red-800'>
        Something went wrong...
      </p>
      <p className='text-sm text-gray-600 mt-2'>
        {error?.data?.error || "An unexpected error occurred. Please try again later."}
      </p>
    </div>
  ) : (
    article.summary && (
      <div className='max-w-full w-full bg-white shadow-md rounded-lg p-6'>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          Article <span className='text-blue-600'>Summary</span>
        </h2>
        <div className='border-t border-gray-200 pt-4'>
          <p className='text-gray-700 leading-relaxed'>
            {article.summary}
          </p>
        </div>
      </div>
    )
  )}
</div>

    </section>
  );
};

export default Demo;
