import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Body.css';
import Logo from '../assets/logo/logo.png';

const Body = () => {
    const [latestAppVersion, setLatestAppVersion] = useState('');
    const [downloadLink, setDownloadLink] = useState('');
    const [alternate1Link, setAlternate1Link] = useState('');
    const [alternate2Link, setAlternate2Link] = useState('');

    useEffect(() => {
        const checkVersionAPI = async () => {
            let response = await axios.get(
                'http://devsmranjan.github.io/covid-19-tracker-api/v2/app_versions.json'
            );

            setLatestAppVersion(response.data['latest_app_version']);
            setDownloadLink(response.data['latest_app_links']['arm64-v8a']);
            setAlternate1Link(response.data['latest_app_links']['armeabi-v7a']);
            setAlternate2Link(response.data['latest_app_links']['x86_64']);
        };

        checkVersionAPI();
    }, []);

    return (
        <div className='body absolute-center'>
            <div>
                <div className='logo-container'>
                    <img
                        className='logo'
                        src={Logo}
                        alt='COVID-19 Tracker logo'
                    />
                </div>
                <h4 className='app-title'>COVID-19 Tracker</h4>

                {latestAppVersion !== '' ? (
                    <h4 className='version'>v{latestAppVersion}</h4>
                ) : (
                    <span></span>
                )}
                <div className='btn-group mt-24'>
                    <a href={downloadLink} className='btn btn-style-1 btn-lg'>
                        Download (64 bit)
                    </a>
                    <button
                        type='button'
                        className='btn btn-style-1 dropdown-toggle dropdown-toggle-split'
                        data-toggle='dropdown'
                        aria-haspopup='true'
                        aria-expanded='false'>
                        <span className='sr-only'>Download options</span>
                    </button>
                    <div className='dropdown-menu dropdown-menu-right'>
                        <a className='dropdown-item' href={alternate1Link}>
                            Alternative 1 (32 bit)
                        </a>
                        <div className='dropdown-divider'></div>
                        <a className='dropdown-item' href={alternate2Link}>
                            Alternative 2 (x86_64)
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Body;
