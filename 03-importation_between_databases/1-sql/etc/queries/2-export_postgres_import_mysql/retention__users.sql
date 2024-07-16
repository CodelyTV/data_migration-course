--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: retention__users; Type: VIEW; Schema: shop; Owner: codely
--

CREATE VIEW shop.retention__users AS
 SELECT id,
    email,
    created_at AS last_activity_date,
    created_at AS registration_date
   FROM shop.users;


ALTER VIEW shop.retention__users OWNER TO codely;

--
-- PostgreSQL database dump complete
--

