# **API Specification Doc**

**(**_ **College Management App** _**)**

# Index

# Contibutors/Team Members

1. Raees Ahmad
2. Hafiza Asma
3. Ibrahim
4. Deep Patel

//........................................................................................
//........................................................................................



[1. login](#_bit7idv2ancx)

[Request](#_kd6tjl5w5wjo)

[Response](#_8b7ijrpuamb8)

[2. get updates](#_9t094e45sg90)

[Request](#_38pypefkb82)

[Response](#_47awg09ehquu)

[3. deletions](#_9mc75gzfq3m3)

[Request](#_xtszbus9yomc)

[Response](#_xuhh3y4ufz7)

4. get data

[Request](#_iaps2dh7l2m2)

[Response](#_fvf6lulvf6wv)

[Codes](#_of6ke88xwee4)

# Methods

## 1. login

Authenticate the user with the system and obtain the auth\_token

## Request

| **Method** | **URL** |
| --- | --- |
| **Get** | api/login/ |

| **Type** | **Params** | **Values** |
| --- | --- | --- |
| HEADPOSTPOST | objectusernamepassword | **application/json** stringstring |

## Response

| **Status** | **Response** |
| --- | --- |
| 200 | {&quot;Id&quot;: &quot;string&quot;,&quot;email&quot;: &quot;string&quot;,&quot;type&quot;: &quot;string&quot;, ex: (superAdmin,admin,student,employe)} |
| 403 | {&quot;error&quot;:&quot;data is missing.&quot;} |
| 400 | {&quot;error&quot;:&quot;Please provide username.&quot;} |
| 400 | {&quot;error&quot;:&quot;Please provide password.&quot;} |
| 401 | {&quot;error&quot;:&quot;Incorrect username or password.&quot;} |
| 404 | {&quot;error&quot;:&quot;Network error.&quot;} |
| 500 | {&quot;error&quot;:&quot;Something went wrong. Please try again later.&quot;} |

##


## 2. Add School(Only Super admin register)

## Request

| **Method** | **URL** |
| --- | --- |
| **POST** | api/addSchool/ |

| **Type** | **Params** | **Values** |
| --- | --- | --- |
| HEADPOST | object{school\_name:string,school\_id:int,owner\_name:string,school\_email:string,school\_pass:string,amount:int} | **application/json** object |

## Response

| **Status** | **Response** |
| --- | --- |
| 200 | **School Created**** Successfully** |
| 400 | {&quot;error&quot;:&quot;Please specify database version.&quot;} |
| 403 | {&quot;error&quot;:&quot;data is missing.&quot;} |
| 400 | {&quot;error&quot;:&quot;Please provide username.&quot;} |
| 404 | {&quot;error&quot;:&quot;Network error.&quot;} |
| 500 | {&quot;error&quot;:&quot;Something went wrong. Please try again later.&quot;} |

## 3. Get/Delete Schools

Get more information on a particular recipe

## Request

| **Method** | **URL** |
| --- | --- |
| **GET** | api/getSchool |
| **DELETE** | api/deleteSchool/\&lt;school\_id\&gt; |

| **Type** | **Params** | **Values** |
| --- | --- | --- |
| Get | null | null |
| DELETE | \&lt;school\_id\&gt; | int |

## Response

| **Status** | **Response** |
| --- | --- |
| 200




 | **(Get) -\&gt; An object containing the data of all school**
Example response:-{school\_name:string,school\_id:int,owner\_name:string,school\_email:string,school\_pass:string,amount:int} |
| 200 | **(Delete) -\&gt; School deleted Successfully** |
| 400 | {&quot;error&quot;:&quot;Please specify database version.&quot;} |
| 403 | {&quot;error&quot;:&quot;data is missing.&quot;} |
| 404 | {&quot;error&quot;:&quot;Network error.&quot;} |
| 500 | {&quot;error&quot;:&quot;Something went wrong. Please try again later.&quot;} |

## 4. Add New Student

## Request

| **Method** | **URL** |
| --- | --- |
| **POST** | api/addSchool/ |

| **Type** | **Params** | **Values** |
| --- | --- | --- |
| POST | {Gr#:int,Student\_info:{...},Father\_info:{...}} | object |

## Response

| **Status** | **Response** |
| --- | --- |
| 200




 | Student Created Successfully |
| 400 | {&quot;error&quot;:&quot;Please specify database version.&quot;} |
| 403 | {&quot;error&quot;:&quot;data is missing.&quot;} |
| 404 | {&quot;error&quot;:&quot;Network error.&quot;} |
| 500 | {&quot;error&quot;:&quot;Something went wrong. Please try again later.&quot;} |

##
5. Add New Employee

## Request

| **Method** | **URL** |
| --- | --- |
| **POST** | api/addEmployee/ |

| **Type** | **Params** | **Values** |
| --- | --- | --- |
| POST | {Employee\_id:int,Employee\_info:{...}} | object |

## Response

| **Status** | **Response** |
| --- | --- |
| 200




 | Employee Created Successfully |
| 400 | {&quot;error&quot;:&quot;Please specify database version.&quot;} |
| 403 | {&quot;error&quot;:&quot;data is missing.&quot;} |
| 404 | {&quot;error&quot;:&quot;Network error.&quot;} |
| 500 | {&quot;error&quot;:&quot;Something went wrong. Please try again later.&quot;} |

## 6. Receipt Voucher

## Request

| **Method** | **URL** |
| --- | --- |
| **POST** | api/receiptVoucher/ |

| **Type** | **Params** | **Values** |
| --- | --- | --- |
| POST | {month:string,date:string,student\_info{},} | object |

## Response

| **Status** | **Response** |
| --- | --- |
| 200




 | Fee Submitted Successfully |
| 400 | {&quot;error&quot;:&quot;Please specify database version.&quot;} |
| 403 | {&quot;error&quot;:&quot;data is missing.&quot;} |
| 404 | {&quot;error&quot;:&quot;Network error.&quot;} |
| 500 | {&quot;error&quot;:&quot;Something went wrong. Please try again later.&quot;} |

## 7.Daily Expenses

## Request

| **Method** | **URL** |
| --- | --- |
| **POST** | api/dailyExpenses/ |
| **GET** | Api/getDailyExpenses/ |

| **Type** | **Params** | **Values** |
| --- | --- | --- |
| POST | {title:string,description:string,amount:int} | object |
| GET | null | null |

## Response

| **Status** | **Response** |
| --- | --- |
| 200




 | **(Post)-\&gt; Submitted** |
| 200 | **(Get) -\&gt; An object containing the data of daily expenses**
Example response:-{title:string,description:string,amount:int} |
| 400 | {&quot;error&quot;:&quot;Please specify database version.&quot;} |
| 403 | {&quot;error&quot;:&quot;data is missing.&quot;} |
| 404 | {&quot;error&quot;:&quot;Network error.&quot;} |
| 500 | {&quot;error&quot;:&quot;Something went wrong. Please try again later.&quot;} |

# Glossary

## Conventions

- **Client** - Client application.
- **Status** - HTTP status code of response.
- All the possible responses are listed under &#39;Responses&#39; for each method. Only one of them is issued per request server.
- All response are in JSON format.
- All request parameters are mandatory unless explicitly marked as [optional]
- The type of values accepted for a _request_ parameter are shown the the values column like this [**10** |\&lt;any number\&gt;] .The | symbol means _OR_. If the parameter is [optional], the default value is shown in blue bold text, as **10** is written in [**10** |\&lt;any number\&gt;].

## Status Codes

All status codes are standard HTTP status codes. The below ones are used in this API.

2XX -Success of some kind

4XX -Error occurred in client&#39;s part

5XX -Error occurred in server&#39;s part

| **Status Code** | **Description** |
| --- | --- |
| 200 | OK |
| 201 | Created |
| 202 | Accepted (Request accepted, and queued for execution) |
| 400 | Bad request |
| 401 | Authentication failure |
| 403 | Forbidden |
| 404 | Resource not found |
| 405 | Method Not Allowed |
| 409 | Conflict |
| 412 | Precondition Failed |
| 413 | Request Entity Too Large |
| 500 | Internal Server Error |
| 501 | Not Implemented |
| 503 | Service Unavailable |