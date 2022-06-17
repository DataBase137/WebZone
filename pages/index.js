import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const TypeWriter = function(txtElement, words, wait = 5000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  // Type Method
  TypeWriter.prototype.type = function() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if(this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span>${this.txt}<span></span></span>`;

    // Initial Type Speed
    let typeSpeed = 250;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 1000;
    }

    setTimeout(() => this.type(), typeSpeed)
  }

  // Init App
  function init() {
    const txtElement = document.querySelector("#txt-type");
    const words = JSON.parse(txtElement.getAttribute("data-words"));
    const wait = txtElement.getAttribute("data-wait");
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <>
    <Head>
      <title>WebZone | Home</title>
    </Head>
    <div className={ styles.homeContainer }>
      <div className={ styles.banner }>
          <div className={ styles.content }>
              <h1 className={ styles.h1Txt }>
                <span className={ styles.txtType } id="txt-type" data-wait="2000" data-words='["Explore", "Create", "Design"]'><span></span></span>
              </h1>
            <p className={ styles.bannerHook }>WebZone makes it easy for you to make your own website. With a user friendly experience, and no cost, the possibilities are endless. So why not start building now?</p>
          </div>
      </div>
    </div>
    </>
  )
}
