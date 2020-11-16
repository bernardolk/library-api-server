--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1
-- Dumped by pg_dump version 13.1

-- Started on 2020-11-15 14:50:23

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
-- TOC entry 3028 (class 1262 OID 16394)
-- Name: library-db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "library-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';


ALTER DATABASE "library-db" OWNER TO postgres;

\connect -reuse-previous=on "dbname='library-db'"

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16451)
-- Name: book_loans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_loans (
    book_loan_id integer NOT NULL,
    "user" integer,
    date_loaned date,
    due_date date,
    book integer NOT NULL
);


ALTER TABLE public.book_loans OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16449)
-- Name: book_loans_book_loan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.book_loans_book_loan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_loans_book_loan_id_seq OWNER TO postgres;

--
-- TOC entry 3029 (class 0 OID 0)
-- Dependencies: 201
-- Name: book_loans_book_loan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.book_loans_book_loan_id_seq OWNED BY public.book_loans.book_loan_id;


--
-- TOC entry 204 (class 1259 OID 16475)
-- Name: book_statuses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_statuses (
    book_status_id integer NOT NULL,
    status_name character varying NOT NULL
);


ALTER TABLE public.book_statuses OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16473)
-- Name: book_statuses_book_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.book_statuses_book_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_statuses_book_status_id_seq OWNER TO postgres;

--
-- TOC entry 3030 (class 0 OID 0)
-- Dependencies: 203
-- Name: book_statuses_book_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.book_statuses_book_status_id_seq OWNED BY public.book_statuses.book_status_id;


--
-- TOC entry 200 (class 1259 OID 16395)
-- Name: books; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.books (
    date_added date NOT NULL,
    book_status smallint NOT NULL,
    book_name character varying NOT NULL,
    book_id integer NOT NULL,
    book_details character varying NOT NULL
);


ALTER TABLE public.books OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16534)
-- Name: books_book_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.books ALTER COLUMN book_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.books_book_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483627
    CACHE 1
    CYCLE
);


--
-- TOC entry 206 (class 1259 OID 16486)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    registration_hash character varying NOT NULL,
    authentication_hash character varying NOT NULL,
    first_name character varying NOT NULL,
    library_id character varying(6) NOT NULL,
    registration_date date NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16484)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 3031 (class 0 OID 0)
-- Dependencies: 205
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 2871 (class 2604 OID 16454)
-- Name: book_loans book_loan_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans ALTER COLUMN book_loan_id SET DEFAULT nextval('public.book_loans_book_loan_id_seq'::regclass);


--
-- TOC entry 2872 (class 2604 OID 16478)
-- Name: book_statuses book_status_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_statuses ALTER COLUMN book_status_id SET DEFAULT nextval('public.book_statuses_book_status_id_seq'::regclass);


--
-- TOC entry 2873 (class 2604 OID 16489)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 2875 (class 2606 OID 16537)
-- Name: books UNIQUE_book_name; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT "UNIQUE_book_name" UNIQUE (book_name);


--
-- TOC entry 2885 (class 2606 OID 16498)
-- Name: users UNIQUE_library_id; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UNIQUE_library_id" UNIQUE (library_id);


--
-- TOC entry 2887 (class 2606 OID 16541)
-- Name: users UNIQUE_reg_hash; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UNIQUE_reg_hash" UNIQUE (registration_hash);


--
-- TOC entry 2880 (class 2606 OID 16456)
-- Name: book_loans book_loans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT book_loans_pkey PRIMARY KEY (book_loan_id);


--
-- TOC entry 2883 (class 2606 OID 16483)
-- Name: book_statuses book_statuses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_statuses
    ADD CONSTRAINT book_statuses_pkey PRIMARY KEY (book_status_id);


--
-- TOC entry 2877 (class 2606 OID 16402)
-- Name: books books_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT books_pkey PRIMARY KEY (book_id);


--
-- TOC entry 2889 (class 2606 OID 16494)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 2878 (class 1259 OID 16510)
-- Name: fki_FK_book_status; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_book_status" ON public.books USING btree (book_status);


--
-- TOC entry 2881 (class 1259 OID 16516)
-- Name: fki_FK_user; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "fki_FK_user" ON public.book_loans USING btree ("user");


--
-- TOC entry 2892 (class 2606 OID 16529)
-- Name: book_loans FK_book; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT "FK_book" FOREIGN KEY (book) REFERENCES public.books(book_id) NOT VALID;


--
-- TOC entry 2890 (class 2606 OID 16505)
-- Name: books FK_book_status; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.books
    ADD CONSTRAINT "FK_book_status" FOREIGN KEY (book_status) REFERENCES public.book_statuses(book_status_id);


--
-- TOC entry 2891 (class 2606 OID 16511)
-- Name: book_loans FK_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_loans
    ADD CONSTRAINT "FK_user" FOREIGN KEY ("user") REFERENCES public.users(user_id);


-- Completed on 2020-11-15 14:50:23

--
-- PostgreSQL database dump complete
--


INSERT INTO public.book_statuses(
	book_status_id, status_name)
	VALUES (1, 'available');

INSERT INTO public.book_statuses(
	book_status_id, status_name)
	VALUES (2, 'unavailable');

