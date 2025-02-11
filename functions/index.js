/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors");
const axios = require("axios");

console.log("Obaloluwa, it's working!");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started
//   messages: req.body.messages,
// model: "gpt-4",

const callTranscript = `You are analyzing a sales call transcript with the sole task of determining the accurate output below. Here is the call transcript you need to analyze: <call_transcript>  00:01:01 - Velco Scepanovic (Giannino Products & Services)
      Okay, there he is.    Yes, can you get?
  00:01:05 - nitin
      Yes, yes, staying out of trouble?    Yeah.
  00:01:12 - Velco Scepanovic (Giannino Products & Services)
      Let me see here useful with my mate Ken before, and then he booked this in for two of us.
  00:01:19 - nitin
      Yes.
  00:01:20 - Velco Scepanovic (Giannino Products & Services)
      And now here on the left, what I'm looking at is he did leave me some notes on you.    And as you imagine, as I'm sure he said, we do want to have this call to obviously make sure we are not wasting time and see if there's even going to be fit with what we do and what you're looking for.    Yes, definitely.    I don't want to get lost in translation by just reading notes.    Is it okay if me and you cover a couple of these basics first?
  00:01:46 - nitin
      Yeah, yeah, absolutely fine.
  00:01:47 - Velco Scepanovic (Giannino Products & Services)
      Right on.    mean, if you can tell me a bit about your option trading journey, how is it going?    You've been making losing money in a very hard now.
  00:01:56 - nitin
      So I started this probably year and    have two years ago but I just was using like a signal service which the guy was giving like two signals per week and it was it's usually it was usually for like three week period the option used to last for three weeks and it was like a credit spread or a debit spread one of those two options that's what I did for one year and I think it was kind of close to even I tried to go back and see but it was I think it was mostly close to even or I may have lost some money there yeah but then the subscription price kind of went up and then like I kind of I didn't renew that one I didn't get much as I was hoping to get out of it
  00:03:01 - Velco Scepanovic (Giannino Products & Services)
      Why do you think that is?
  00:03:05 - nitin
      So, one is I did not have any knowledge.    So I was kind of blindly following.
  00:03:12 - Velco Scepanovic (Giannino Products & Services)
      Okay.
  00:03:13 - nitin
      the other thing was, it was a spread.
  00:03:16 - Velco Scepanovic (Giannino Products & Services)
      So obviously there was a fixed, fixed loss.
  00:03:21 - nitin
      But sometimes I used to like buy two or three contracts.    And then those happened to turn out to be the losers.    So you kind of, you know how your risk to reward ratio turned other way down.    Yeah.
  00:03:40 - Velco Scepanovic (Giannino Products & Services)
      I hear you.    And you mentioned you've been doing this for about a year and a half and in total breaking even or a bit in a red.
  00:03:48 - nitin
      Yeah.
  00:03:49 - Velco Scepanovic (Giannino Products & Services)
      Any specific reason as to why you stuck for it so long, even though it wasn't quite working?
  00:03:55 - nitin
      You it used to, it used to like go up and down.    it wasn't like I was like losing losing losing if it was losing losing losing then I would have got out of it yeah yeah but it was I mean there were times when yes it used to profit and sometimes I used to increase the the contract size and then it used to go other way around and it used to come back other trades and so on yep and I was trading only one contract most of the time sometimes I used to bump it up to two or three at the max and is this all of your options trading?    no that's all okay okay so you service the entire time yes yes I mean I did some reading on own yeah on going to YouTube and other places just kind of getting myself familiar with the terms
  00:05:01 - Velco Scepanovic (Giannino Products & Services)
      And in this year and a half of picking, I'm guessing those signals are all that you could trade it, correct?
  00:05:08 - nitin
      Sorry, what is the question?
  00:05:10 - Velco Scepanovic (Giannino Products & Services)
      Were those signals all that you have traded or were you doing that?
  00:05:13 - nitin
      I didn't do anything on my own.
  00:05:15 - Velco Scepanovic (Giannino Products & Services)
      No.    Okay.    Okay.    You wanted to keep it safe.
  00:05:18 - nitin
      That's smart.    Yes.    I didn't know the basics and I didn't know what to look for and who went to enter and fix it.    So rather than trying to do something on my own, just take to the basic and rely on someone else.    Thank you.
  00:05:35 - Velco Scepanovic (Giannino Products & Services)
      And in this year and a half of doing that, let's say relying on somebody else picking up the trades, if you can tell me really honestly, his, your knowledge, let's say expanded at any significant rate or would you say knowledge wise, you're kind of similar, what is when you started?
  00:05:50 - nitin
      I would say it increased just based on the reading.    It has an increased in of that I can predict.
  00:06:00 - Velco Scepanovic (Giannino Products & Services)
      Okay, I hear you.    And that signal service, I think you did mention it was a subscription, correct?
  00:06:10 - nitin
      Yes.
  00:06:10 - Velco Scepanovic (Giannino Products & Services)
      And did you stop it only because the subscription price went up or was there any other reason?
  00:06:17 - nitin
      No, that was one reason.    But the other reason I didn't see my account growing.    Yeah, that was the other reason.    I mean, if the account was growing, then the increased price makes sense, right?
  00:06:33 - Velco Scepanovic (Giannino Products & Services)
      would record that money in maybe another couple of months.    Yes.
  00:06:38 - nitin
      Yeah.    And it was like a yearly membership.
  00:06:41 - Velco Scepanovic (Giannino Products & Services)
      Well, so you were saying, okay, I've done it for a year.    It didn't really take me much for her.    So no need to renew.
  00:06:47 - nitin
      That does make sense.    Let's say the yearly service paid for itself in couple of months.
  00:06:52 - Velco Scepanovic (Giannino Products & Services)
      And then you...    It's a no brainer, right?
  00:06:55 - nitin
      It's in profit, then it's a no brainer, yeah.
  00:06:57 - Velco Scepanovic (Giannino Products & Services)
      Exactly.    agree with you.    I hear what you're saying.    Do you mind me asking how much that service actually was?
  00:07:02 - nitin
      How much did it cost?    It was, I think, around $800, think.
  00:07:12 - Velco Scepanovic (Giannino Products & Services)
      Now, do you believe in the term you get what you pay for?
  00:07:20 - nitin
      Yes and no, I would say.    And the reason I'm saying yes is because I kind of experienced it.    No, because one of my other friends, he paid much more without our service.    And he had similar results.    But he paid more.    paid, like, I think, $5,500 something.
  00:07:47 - Velco Scepanovic (Giannino Products & Services)
      And what triggered you like this year and a half ago, that's the first time you've done options, as you said.    Yes.    triggered you to get into options in the first place?
  00:07:57 - nitin
      So, I used to trade stocks.    a couple of years ago, probably long time ago, not couple of years ago.    And then it used to be like you're stuck with the stock and usually it would be like maybe $2, $3, $1.    And then you need to put that entire amount.    It's kind of blocked, right?    I read somewhere, I came across I can add or something which showed the percentage profit that you would earn when it compares to operations options.    And that's what is like your investment is low, ROI is more.    So that's what triggered me to go into options.    I'm not doing that much capital.
  00:08:42 - Velco Scepanovic (Giannino Products & Services)
      Yeah.    And how do you feel about your option trading journey thus far?
  00:08:47 - nitin
      It's, I mean, I like it.
  00:08:49 - Velco Scepanovic (Giannino Products & Services)
      I would like to continue it further.
  00:08:52 - nitin
      But I'm not at point where I can trade on my own right now, honest to be honest.
  00:08:59 - Velco Scepanovic (Giannino Products & Services)
      Okay.
  00:09:00 - nitin
      And I mean, is that important for you to eventually be training on your own or I mean, it's not it's not important.    mean, it is and it is not.    I mean, the reason I'm saying it is important, because even if I let's say to a signal service and I get service, I mean, I should be knowledgeable enough to say, should I jump into it or should I not jump into it.    Just because someone is saying, do I blindly copy and trade versus, yeah, it makes sense and maybe if I don't jump in a district price, I jump in at a different strike price, I go with a different delta and so on.    on the other hand, if I just learn on my own, I start trading, maybe I depends on what strategy I use, because there's so many stocks, right?    mean, obviously, you're not going to trade in those thousands of stocks even.
  00:10:00 - Velco Scepanovic (Giannino Products & Services)
      Start selecting the indexes or the high stocks, one of them.
  00:10:05 - nitin
      And so many strategies, other applies, trying old selling, you know, you're not going to like go and start doing each one of them, right?    it's kind of vast, but you need to kind of focus on like a small thing that works and consistently works.
  00:10:21 - Velco Scepanovic (Giannino Products & Services)
      I agree with you.    that's basically what we do.    strategy wise, what do you feel is most aligned with you.    I mean, you've been doing gives up, you've been doing butterflies for a year and a half, right?
  00:10:31 - nitin
      No spread.
  00:10:32 - Velco Scepanovic (Giannino Products & Services)
      Oh, spreads.
  00:10:33 - nitin
      Oh, my bad.
  00:10:34 - Velco Scepanovic (Giannino Products & Services)
      Would you say that's something that you would like to keep getting educated on and getting the knowledge on or for your strategy?
  00:10:42 - nitin
      I'm not tied to any strategy.    I mean, I could do like a call or a book, like buy a call or buy a book.    And because it's my right, but not my obligation to buy the stock, right?    versus if I go like a covered call on it.    covered food, then I need to have that underlying stop.    So I'm not stuck to any particular study.
  00:11:08 - Velco Scepanovic (Giannino Products & Services)
      You are open to whatever works in the system.
  00:11:10 - nitin
      What are something that works and gives consistent results?
  00:11:15 - Velco Scepanovic (Giannino Products & Services)
      Okay, did you have a chance to see that 45 minute video that can send you?
  00:11:23 - nitin
      I don't When was it said?
  00:11:29 - Velco Scepanovic (Giannino Products & Services)
      Sorry.    I don't.    I know before he books this meeting in with me because that video basically explains what our strategy is, what that was, student we're looking for, and that's why it's 45 minutes.    And then that the explanation talks about the fact that we sell cash secured puts and do a bit of leaves.    Do you remember hearing anything of that?
  00:11:50 - nitin
      No, no, I don't remember that.
  00:11:52 - Velco Scepanovic (Giannino Products & Services)
      Sorry.    Okay, it's fine.    No, it's completely okay.    So, have you ever sold the cash secured puts before?
  00:11:58 - nitin
      Do you know how that goes?    I have not done    done that because I mean I have underlying stocks but those are like really old like 10 earlier old stocks but they are like not that much value yes but and they don't they don't they don't move that much yes it's kind of it's been sitting in my account for a long time and why are you mentoring that what is that why are you mentoring that just now oh no no you said cash secured puts right yes oh no sorry cash secured okay sorry you don't have to own the stock in order you're talking about covered covered calls no okay sorry about that I can feel like the covered okay yeah the cash secured put and calls yes I have heard about it but I have not traded those I'm not user start with you yeah would you know anything about it well isn't that isn't that similar to the    buying a call buying a put?
  00:13:03 - Velco Scepanovic (Giannino Products & Services)
      It's actually the complete opposite to let me let me actually show you something.    Before I show you this, I also wanted to ask you, you've been doing that sort of strategy for a year.    Now you're coming to us to explore another strategy.
  00:13:20 - nitin
      It sounds to me like you do to begin with, I want to add some extra income.    I have two kids and one of my kids in next couple of years is going to go to college so I need to start.
  00:13:41 - Velco Scepanovic (Giannino Products & Services)
      haven't done any sort of like prepaid or any college fungicide so that's one of the big expense that I'm looking at.
  00:13:52 - nitin
      That is one thing and obviously I have another like 15 years before retirement so I don't, if you continue to    to work, then you need to start thinking about expenses after retirement and all that.
  00:14:06 - Velco Scepanovic (Giannino Products & Services)
      And thus far, do you think you're well set up for those or would you need a bit more to be comfortable?
  00:14:11 - nitin
      I need a lot more.
  00:14:13 - Velco Scepanovic (Giannino Products & Services)
      Okay, okay.    all of a sudden, this sounds even more important.
  00:14:17 - nitin
      Yes, I didn't ask you, what is your current account size?    So I started trading with like $5,000 because I didn't want to like go full-fledged and not knowing what I'm getting into.    That's why I started trading less.    But if the strategy works, then I could go higher than that.
  00:14:40 - Velco Scepanovic (Giannino Products & Services)
      Okay, I won't thus explore those numbers.    So you currently do have an active trading account, correct?    Yes.    Okay, and do you currently have that around the same five here or how much is in there currently?
  00:14:54 - nitin
      It's team five here.
  00:14:55 - Velco Scepanovic (Giannino Products & Services)
      Five here.    And let's say this, the strategy work to work.    It's extremely consistent.    and then for two, three, four, five months, how much would you actually be looking to put in more potentially to have it come on quicker?
  00:15:09 - nitin
      I don't know right now.    I need to see the numbers before I kind of decide how much I need to kind of go in and scale the contract size.
  00:15:21 - Velco Scepanovic (Giannino Products & Services)
      Now, very important thing about our strategy.    And again, I'm saying this out of respect to both of our times.    Two years you have from going to college than many, many more for years until the retirement.    With the strategy that we do, we are looking to make 5% to 10% a month.    In your case, on your account size, you will be starting off making about that 5%, which will result in a month.    Obviously, that is not a life-changing amount of money in any way.    But we do want to focus on the consistency and having that 5% a month on pounds.    However, do you feel like at this current point, you're looking for something that's a bit faster than that, or how do you feel about 5 to 10% a month?
  00:16:09 - nitin
      Well, to begin with, a 5 to 10% may seem less, but with compounding, it's definitely, it's more.    And then if I can upscale the account, then yes, it is going to be more.
  00:16:24 - Velco Scepanovic (Giannino Products & Services)
      Exactly.    And that's what I want.
  00:16:27 - nitin
      Yeah, I would rather be rather not happy, I would say, but rather like someone not over-promising 100, 200, 3 hours, and then come back and see it's not working.
  00:16:44 - Velco Scepanovic (Giannino Products & Services)
      Exactly.    mean, look, this is the thing, let me actually show this to you, because I can share my screen and explain all of it, and let's say that.    So, you have a $5,000 account, let's say you are the 5 to 10, let's not even say your account.    system being consistent, so it is a bit harder than this, you can imagine, right?
  00:18:04 - nitin
      Yes, definitely, yeah.
  00:18:05 - Velco Scepanovic (Giannino Products & Services)
      Can you see yourself having that patience to execute it in this manner?
  00:18:11 - nitin
      Yeah, definitely, yeah.    So, number one is I haven't gone too far into options trading, so there's not a whole lot to undo and unlearn and relan.    So, and again, right now I don't have a consistent strategy or any strategy, would say.    So, it's better to start with a strategy rather than having good different strategies and seeing that it has not been working and then switch to a new one, you kind of go with that mindset, is it going to work or not?
  00:18:53 - Velco Scepanovic (Giannino Products & Services)
      I sure, yeah.    Okay, one more thing that I want to tell you, you remember when you were talking about what we do and what characteristics.    your goods are.
  00:19:01 - nitin
      So have you ever seen this website before?    No.
  00:19:05 - Velco Scepanovic (Giannino Products & Services)
      This right here is called options and I want to explain to you in like a minute what we do.    You asked me is it similar to buying calls and boots and I said it's the exact opposite thing.    So let's say we are buying a call so we are long a call on Nvidia.
  00:19:19 - nitin
      Yeah.
  00:19:20 - Velco Scepanovic (Giannino Products & Services)
      No matter where we go in the strike price do you see what it says here?
  00:19:27 - nitin
      Chance of profit.
  00:19:28 - Velco Scepanovic (Giannino Products & Services)
      Correct.    So this website automatically will just recalculate the chances of profit behind the trades and finds the Greeks, etc.    What am I trying to say?    When you are buying options, when you are buying calls, buying boots, etc, you are never even as good as a coin flip.    Even if we go down in the strike price, the chance of profit on this is 46%.    It's as if you are playing Black Trek in casino.
  00:19:54 - nitin
      So how are you?    Sorry.    How are you?    Isn't the    on set with the long call is your stop needs to go the strike price plus the premium that you paid to be to break even and then it has to go above that for you to even make up it what are you referring to like a long call yes so let's say you buy a strike price at let's say 130 and you pay five dollar premium then don't your stop price have to go to like 135 to be even and then but in this is even you're going down it's still showing chance of profit is this is because you can do it from a strike price that is lower and then shooting for a higher one because for example you can start it off at a lower price and then it goes up and then again this is the transfer profit or what you just mentioned happening this is the chance of that happening yeah now why am I showing you this what do we do we do the exact opposite we switch the selling    and instead of a call, you're selling a put.    Now, once we make this switch, look at what happens to the transfer profit.
  00:21:06 - Velco Scepanovic (Giannino Products & Services)
      Now, you're looking at an 80%.    However, a strategy like this, the downside to doing a strategy that has a 90% chance of profit, and if I show you our trading method, if you look at this, these are the trades that we are currently doing ourselves, look at the extremely easy to win, but the wins are much smaller, and that's why people are turned away, because everybody wants to make money quickly.    But what people see as a problem with that, they want to make money quickly, and by wanting to make money quickly, they keep one thing and trying to make it quickly for the next five years, but it never happens.    Instead of actually sticking to something that's going to make it slowly but surely.    Yes, makes sense.    That's a let's have a brief explanation of what the
  00:22:00 - nitin
      try to do yes.
  00:22:01 - Velco Scepanovic (Giannino Products & Services)
      Now, you having these set goals for college, which is beautiful, better retirement, etc.    Would you have any estimate as to later down the line, ideally, what amount of money you would need to make to, let's say, have a more suitable retirement or what is this looking for you like financially as to what you want to make on a monthly basis?
  00:22:26 - nitin
      At least like 10, I would say, on a monthly basis?
  00:22:31 - Velco Scepanovic (Giannino Products & Services)
      Around 10?
  00:22:32 - nitin
      Yeah, well, any reason for that specific number?    Well, I'm thinking because my house will be paid off and then just looking at my expenses.    Two daughters, they will go to college.    I mean, obviously, you need to pay for their college, but so I said 10 to 15, I would say, but once    Then with the college, then it makes me go down again.
  00:23:03 - Velco Scepanovic (Giannino Products & Services)
      It's just going to be me and my wife, just two of us.    Yes.
  00:23:08 - nitin
      Now, if you were to be making 5% 10% a month, or two, three, four, five months consistently, how much more money would you put in?
  00:23:20 - Velco Scepanovic (Giannino Products & Services)
      you think you could put another 5 or another 10 or another 50?    If you could not, it's any idea as to how much you're up to.
  00:23:28 - nitin
      Yeah, I would maybe go another 5.
  00:23:32 - Velco Scepanovic (Giannino Products & Services)
      Yeah, I need to kind of see it consistently work for work for over a period.
  00:23:40 - nitin
      I would say I could go another 5.
  00:23:43 - Velco Scepanovic (Giannino Products & Services)
      OK.
  00:23:45 - nitin
      And after you went to your previous subscription end, exactly.    Oh, you didn't last year already done.
  00:23:55 - Velco Scepanovic (Giannino Products & Services)
      OK.    So what you said you were doing that for a year?
  00:24:00 - nitin
      Yes, yeah, yeah, so it's been a year and a half.    So the subscription ended around I'd say June or July of last year Okay, and have you done any trading since last?    Other things going on like work wise and family wise.    I didn't have to get into it again Okay, I mean, why is it important for you now to stand back into this?    I mean I Same reason like three years ago to go to college.    We can get up I need to do something now And if I don't do things are not going to change Exactly, you know the definition by Einstein.    Yeah of insanity is doing the same thing and expecting a different outcome, right?
  00:24:49 - Velco Scepanovic (Giannino Products & Services)
      Yes One thing that I see for people being an issue So I want to address this immediately is the way that our programs are structured.    These are not    monthly subscriptions, etc.    This is a commitment where we have people, yes, we're to have our trades, so you can do them and gain the confidence of doing them.    But there's also this full learning aspect where we are teaching you, coaching you, and you're watching videos so that you can become better and do this on your run.    You have much more of a long-term goal, so just having our trades forever or us holding your hand for 5, 10 years doesn't make too much sense.    In 6 to 12 months, depending on how much we feel like you need, we want you to just say, okay guys, I understand all this, I'm going to keep doing the strategy my own, goodbye.    That's our goal.    How do you feel investing wise in that matter given that you are using subscriptions?    Are you okay doing more of programs that are for coaching, upfront payments, more commitments, rather than paying something like 800 bucks for a year, etc.
  00:26:00 - nitin
      do you feel?    that topic.    I'm open to that it just depends on the price to be honest and then again see with the 800 it's kind of what you how much you can afford to kind of put in the program right that's definitely one thing but the other thing is from a success perspective how long has been the company in place and how many customers do they have and then what is their win percentage and what does their average win look like what does their average loss look like this fact this things play a bigger or play a critical role in that decision.
  00:26:49 - Velco Scepanovic (Giannino Products & Services)
      Fabius and have you done any of that research before jumping on this call?
  00:26:53 - nitin
      No unfortunately I've been spent with work and other person things family things so I have no    I don't have time, but that was one thing I was hoping to ask in the call.
  00:27:05 - Velco Scepanovic (Giannino Products & Services)
      Okay.    And would you believe me if I were to tell you all of that information as a person that is presenting the company or would you run it?
  00:27:13 - nitin
      it's still good.    do my research.
  00:27:15 - Velco Scepanovic (Giannino Products & Services)
      Exactly.
  00:27:16 - nitin
      Do my research.
  00:27:17 - Velco Scepanovic (Giannino Products & Services)
      It's the smart thing to do.    Now, you have a discussion with Ken at all behind the budgeting for this program.
  00:27:24 - nitin
      No, he said you were going to talk about it.
  00:27:27 - Velco Scepanovic (Giannino Products & Services)
      Exactly.
  00:27:27 - nitin
      Exactly.    And that's what we want to cover.
  00:27:30 - Velco Scepanovic (Giannino Products & Services)
      one more thing that you mentioned importantly is how much I'm going to invest into a program is depending on how much I'm willing to do it at that point.
  00:27:40 - nitin
      Yes.
  00:27:40 - Velco Scepanovic (Giannino Products & Services)
      very important thing that I would need you to tell me in a minute, and do you have a certain budget in your mind?    Are you saying like, hey, I would invest 5,000 not more than that, I would invest 500 not more than that.    Preset numbers so that I can immediately tell you can we work with any of that or not?
  00:27:59 - nitin
      Right.    Honestly, yeah.    have not explored like other programs so I don't, I cannot tell you if what I'm getting is how is it comparable to other programs, right?    See if I go and talk to like 10 different people and say hey you know like XYZ is selling their one-year program for say just quite a lot of ABC is selling their lifetime for $6,000.    Another company is doing a two-year for $4,000 like then I can have like something to compare against.
  00:28:41 - Velco Scepanovic (Giannino Products & Services)
      I don't have that right.    Exactly so to me it would sound like even at this current moment you wouldn't be ready to kind of go for something.    sounds like you have a lot more research and digging to do before you decide what you want to go for, correct?
  00:28:54 - nitin
      Not a lot more.    mean if you, okay if you give me the answers,    for the, like, how long your company has been in place?    many customers do you have?    What kind of program is it, an annual program?    Is it a lifetime program?    it 20 years, three, whatever?    What is the cost?    And then, you know, what's, is there like a, like a guarantee period where if things don't work out, I get the money back and obviously I show the trades that are done to prove that I try to use the system and all that and use the rules and everything.    And then, what am I getting in the program?    Is it just getting signal service, getting trade alerts, getting education?    Is there a trader community?    Is there how many calls do we have on a weekly basis?    Is there a live trading room, 930 to 4 or whatever?
  00:29:50 - Velco Scepanovic (Giannino Products & Services)
      I hear, I hear, I hear what you're saying.
  00:29:52 - nitin
      That, that makes sense.
  00:29:54 - Velco Scepanovic (Giannino Products & Services)
      More, more information on all of the details.
  00:29:56 - nitin
      To make a decision, yes.
  00:29:57 - Velco Scepanovic (Giannino Products & Services)
      A lot of those that you mentioned are covered in the    video that we have sent previously.    So that's something that I'm going to need you to go through first.
  00:30:05 - nitin
      Again, can you tell me like, who did I come from?
  00:30:10 - Velco Scepanovic (Giannino Products & Services)
      Let me just open it up on my end so I can see in the system.    I would doubt, but maybe, maybe can't let it send it out.
  00:30:17 - nitin
      But I'm going to see.    Yeah, let me check on my end.
  00:30:21 - Velco Scepanovic (Giannino Products & Services)
      me one moment.    Okay, so I have a bit of Yeah, yeah.    Okay, I can see he did send you the video.    You were just talking, what's the cost?    What's the cost?    What's the cost into your super interested in that?    And yeah, he did send it to you.    I'm going to resend it now again.
  00:30:49 - nitin
      Great down to the cost to you.
  00:30:52 - Velco Scepanovic (Giannino Products & Services)
      Yeah, where's this?    copy this, face it in there.    You resend.    See a text from me just now did you receive a link?
  00:31:05 - nitin
      Yes, I text it to you Correct.
  00:31:21 - Velco Scepanovic (Giannino Products & Services)
      So that is a 45 minute explanation of what we do strategy wise And it covers various things from the program for me to answer a couple of your questions We've been in business for five years.    There's about 240 people here.    We do table programs.    So what that means is I'm talking to you now and there's a certain thing that you're looking for.    But then I'm talking to somebody else who's been eating options for 10 years.
  00:31:44 - nitin
      I mean, can you imagine how the two of you will need a complete different thing?
  00:31:47 - Velco Scepanovic (Giannino Products & Services)
      Yes.    So that's how we do it.    That's how we do it.    We don't want to provide the same thing for everybody that some people are overpaying for things they don't need.
  00:31:55 - nitin
      So we can add and remove things to make sure it's the right fit.
  00:31:57 - Velco Scepanovic (Giannino Products & Services)
      Now we have them at.    a thousand dollars at three thousand five ten fifteen all the way up to twenty five and that's what it means you would be doing on a call so that we can tailor the program to you once we book in another one sure now do you know what the trust pilot is in it in i know yeah can you look to sub and trust pilot or not um i did not actually i don't know okay because i can i can text to do that link as well so that you can do some digging on that as well so uh matt do you know who mattajanino is oh no okay he's the owner of this company he has a youtube channel with about 120 000 subscribers and he's been uploading every single day for five years why am i telling you this there this guy is very safe socially active so anything that you want to find in the research that you want to do is going to be easily done right we are a very open book because we've been active for so long okay    or please market moves matt so matt janina i have just texted you that video i have texted you the trust pilot link and i have texted you the youtube youtube link okay okay is it the market moves lc 4.7 correct 4.7 out of 200 reviews correct okay i see it yeah yes go through a bit of those watch the watch the 45 minute video that explains the strategy and feel free to watch a couple of matt's youtube videos why am i recommending that you're going to be coached by matt five times a week knitting we have live coaching calls every day of the week we are very dedicated to teaching people how to do this so i'm telling you watch a couple of his videos because then you're gonna see what type of a guy he is if you don't like the guy that's going to be teaching you and best love to join us all right don't make your time exactly so do that watch the video    To go through a bit of trust pilot so that then you can make sure that we can dive into all the details and the Interacencies without it being a waste of time because you're not well educated on the matter Sure.    Okay Yeah, now we have the weekend ahead of us.    You think that's something you can complete the remat Be Saturday Sunday doing bit of digging or how you need me.
  00:34:21 - nitin
      Yeah, I can complete by a Sunday.    Yeah Okay, now what about you or I shoot you a text on Monday or Sunday to catch your thoughts on the research you've done Yeah, yeah possibly I need to look up my calendar, but Monday or Tuesday.    Yeah, I'll send you a text on Monday if you need more time Just tell me hey, well, text me tomorrow.
  00:34:43 - Velco Scepanovic (Giannino Products & Services)
      I'm gonna text you tomorrow.    Whatever now I don't want you feeling like you left this empty handed.    I didn't send you a lot of information Is there something else that you want at this current moment?
  00:34:53 - nitin
      So What's going to be the average price for someone like me who was kind of new?    and not like, I know you said different levels, right?
  00:35:05 - Velco Scepanovic (Giannino Products & Services)
      So what's going to be like an average price?    If you are in that $2,500 to $5,000 range, $2,500 to $5,000 in that range there.
  00:35:14 - nitin
      Okay.    And is that for one year?
  00:35:17 - Velco Scepanovic (Giannino Products & Services)
      That is for six months.    And then that, how do I say this?    It comes with an explanation.    There's a very, very specific reason.
  00:35:27 - nitin
      Even, for example, you mentioned, you remember me mentioning a $25,000 package?    Yeah.
  00:35:33 - Velco Scepanovic (Giannino Products & Services)
      Even in that one, just give people a year.    Now for $25,000, that could give you your family and your dog lifetime access.    It doesn't matter.    But it defeats a certain purpose that is connected with the program and the teachings.    It gets a bit complicated, but we do it in an interesting way.
  00:35:48 - nitin
      That's why the reviews are good.    Okay.    But you said the $2,500 to $5,000 is for six months.
  00:35:54 - Velco Scepanovic (Giannino Products & Services)
      Both of those are for six months.    It's just different things that, again, would require 30 minutes of explanation.    It's...    Done in a in-depth way.    I'd say and a bit Psychological you both of those are six months, but they contain different things depending on what both me and you would like cable This is why I need don't need this.
  00:36:16 - nitin
      Okay, but to also get like trade signals in that of course We encodes five times a week.
  00:36:21 - Velco Scepanovic (Giannino Products & Services)
      get all the trade signals.    You get a community you get the recordings of the Trading sessions if you don't attend them in all of these But I'm telling you just intricacies and this is not Surface level where it's like oh pay us twenty five hundred you get six months pay us five grand You get twelve months pay us ten you get flight time.    It's none of that.
  00:36:43 - nitin
      It's a different approach God, okay.
  00:36:46 - Velco Scepanovic (Giannino Products & Services)
      Okay.
  00:36:48 - nitin
      let me let me do that one more And then we'll touch with someone day that Monday or Tuesday correct one more thing Nathan To I want to let you know one more thing very located sure I'm in    Um, will Florida Jackson and Florida.
  00:37:02 - Velco Scepanovic (Giannino Products & Services)
      you have a good credit score?    Yes, all of our coaching packages can also be, uh, can also be financed over 12 months with no interest.    So have that in mind.    We are very flexible with the payments as well.
  00:37:16 - nitin
      Okay.
  00:37:18 - Velco Scepanovic (Giannino Products & Services)
      I'll keep it in mind.
  00:37:19 - nitin
      Okay.    Stay safe.    I'm going to shoot you a text on Monday and then start with your thoughts.    Okay.
  00:37:24 - Velco Scepanovic (Giannino Products & Services)
      I think that too.    Bye bye.
  00:37:26 - nitin
      Bye bye.`;

const messages = (callTranscript) => [
  {
    role: "system",
    content:
      "You are analyzing a sales call transcript with the sole task of determining the accurate output below.",
  },
  {
    role: "user",
    content: `You are analyzing a sales call transcript with the sole task of determining the accurate output below. Here is the call transcript you need to analyze: <call_transcript>${callTranscript}</call_transcript><sales_script>⬜Level 1 - Frame. Did the rep set the frame to determine the game? [Context, Time, Expectations, Spouse] (within 5min)Greeting. Hey NAME, good to connect with you today. Thanks for taking time out of your day to meet with me.My favorite: Noticing something in their background and asking about its story. Otherwise standard small talk (location, etc.) is fine. Context: How did you hear about us? What's your intention for the call today? [High Level Overview] What we're mainly known for is … People/Companies like… come to us to avoid X get Y… Does that sound like what you came here today to learn more about? Time check: Great, and before we get started, do we have the full 45-minutes, or do you have an earlier hard stop we need to respect? Expectations:  Listen, I've had a lot of these calls and so what I've found works best, with your permission, is to first dive deeper into the specifics of really what's going on in your life, your marriage and what the major challenges are truly that are ultimately holding you back from the life you want to be leading. Now the reason we have these calls is to best determine if we can actually help you and part of that is ensuring you're coachable and motivated to actually make changes so that you can realize the life you really want. Once we get some clarity there - IF we can help you, and you are coachable and motivated to change of course, then I'm more than happy to walk you through what an approach for you would look like specifically, is that cool? And on the flip side, if I don't feel like we can actually help you and we're not the best solution, I'll be transparent and let you know and if at all in this conversation you feel like we aren't on the same page either, I want you to let me know as well—sound good? Spouse check: Last thing, to make sure I'm sharing the most relevant information with you, I want to check: If you decide this is a great fit, is there anyone else you'd need to talk with before moving forward, or are you comfortable making the decision yourself today? (If they say 'depends on price') No worries. What's your threshold for making that decision yourself? If they ask about price, just say that we have options and will cover it if you think they're a good fit for the program. Milestone: You know what 'winning' the call looks like (and if you need to set a follow up). 🟥Level 2 - Isolation. Did the rep isolate their biggest frustration (or pain) based on what they are experiencing today? (by the 10min mark). Opening Question: Alright, so walk me through—What's your biggest frustration right now? Abstract >> 'Not getting affection' (If multiple) Out of everything you just said, what's the most frustrating/challenging thing? What about that is most frustrating? / What bothers you the most about that? Other people experience X, but that's not frustrating for them. Why is it frustrating for you? Specific - What happened recently in reality, and what did you want to happen? (thing gap) >> 'Yesterday morning xyz happened' When did that last happen? (how long has this been going on?) What did you want to have happen? Meaning - What does that gap mean? Why is that so bad? (identity gap / ultimate fear) (Vertical Ladder) >> 'I feel like I am a failure' Why exactly is that so frustrating for you? What would be so bad about that? What if that were true? Say your thought is true, why should it bother you? If that were true, what would it mean? What would be the worst thing about that? What would it say about your future? If that thought were true it would bother me because it would mean... Fear (identity) >> 'I will lose everything that's important to me” What does that mean about you? What happens if that continues? Where does this go? What's the worst case? Closing Question: Sounds like X is your biggest frustration because Y, is that right? 🟧Level 3 - Cause. Did the rep find the root cause of the frustration that is within their control? (by the 15min mark) Opening Question: You're very aware of the challenges, why do you feel you haven't been able to solve _______? What's really stopping you? Alternate Deep (cause) and Wide (info) questions 3x Deep questions (cause) What's stopping you from solving this on your own? What's preventing you from being able to _______? What do you feel is actually behind that? (If they don't have an answer) 'Got it. Sounds like what is preventing you is that you lack the clarity of how to solve it solve it. Is that right?' Wide questions (info) Tell me more How long has that been going on for? Closing Question: So X is your biggest frustration, but at the root, the real issue is Y, is that right? >> 'X is their biggest frustration, the root is a huge identity/child wound, and they feel out of control because they don't know how to solve it' 🟨Level 4 - Emotional. Did the rep find a deep emotional pain that is already driving action today? (by the 20min mark) Opening Question: Let's say we backed up a year from today and you solved that root issue... Where would you be today, like, how would today be different if you had to think about it? This being your biggest frustration/challenge/obstacle/bottleneck, how has this impacted you personally? (What ripple effects is it having in your life?) What are the negative implications in your life over the next decade if you don't make a change? What happens if you don't address this issue in the next month, quarter, or year? What's the worst-case scenario if this isn't addressed? Closing Question: So if I understand correctly, if you had solved the root issue last year, instead of X, you would be experiencing Y today, and if you don't solve it soon, then Z will happen. Is that right? 🟩Level 5 - Financial. Did the rep find a financial cost 10x the offer cost that would motivate action? (by the 25min mark) Opening Question: And how much is this costing you financially? Over the last/next year? Choose with your judgment: How is this impacting your ability to generate income? How much will this cost you over the next year? (Only if they don't have a solid answer, use the time approach) Okay, well how much time or mental bandwidth is this costing you per day? How much would you pay to get another hour per day? So it's costing you… [365 x HOURS x DOLLARS x YEARS] $25 $50 $100 $200 1 hour 46k over 5 years 91k over 5 years 183k over 5yrs 73k over 2yrs 365k over 5yrs 146k over 2yrs 73k just this year 2 hours 91k over 5 years 183k over 5yrs 73k over 2yrs 365k over 5yrs 146k over 2yrs 73k just this year 730k over 5yrs 146k just this year Closing Question: So if I understand correctly, by not solving the root issue last year, not only are you experiencing X instead of Y, but it's also costing you Z over T years… is that right? (silence) How do you feel about that? If this is terribly painful, you may proceed. If it's not a big deal to the person, you missed something in discovery. Go back to where you think you missed (e.g. isolation, cause). 'Sounds like this is not a big deal for you… is there something more important to you than ISOLATED FRUSTRATION?' 🟦Level 6 - Bridge. Did the rep build an effective bridge with high engagement resulting in strong belief? Begin with the Prospect's Main Goal or Problem Identify and articulate the key issue or aspiration the prospect has shared. Example: 'You mentioned your goal is to [goal/problem]. This process is designed specifically to help you achieve that.' Introduce the Solution as 3 Pillars (or Steps). Break down the solution into three clear, concise parts, each addressing a specific pain point or goal. Example: 'The first pillar is Framework. This will help you [specific benefit related to their issue, e.g., create consistency in trading].', 'The second pillar is Implementation. This ensures you apply the techniques effectively with guidance.','The third pillar is Accountability. This keeps you on track so you never lose momentum.' Tie Each Pillar to Their Pain Points Use their own words or specific challenges to show how each pillar solves their problems. Include a trial close after each pillar: 'Does this make sense?' or 'Can you see how this will help you?' Summarize and Reinforce Confidence Ask: 'If you had these 3 pillars in place, is there any reason you think you could fail?' Probe further if needed: 'What do you think would stop you from succeeding?' Emphasize their role: 'The only way you could fail is if you didn't follow through, right?' 🟪Level 7 - Obstacles. Did the rep effectively unblock the bridge by pre-handling all non-financial objections? Pre-Handle Objections (Handle Obstacles) Results - If by working with us, the only thing you got was ROOT CAUSE, (how) would that be worth it for you? (used later for an 'if only' objection handle) Probability - Is there any reason you don't think this program would work for you? (pre-handles the snowflake objection) Timing - If our program is a great fit for you, would you be able to start immediately? Effort/Sacrifice (Time) - Are you able and willing to put in at least X hours per week of time? Empowerment - And just to confirm… you're the decision maker and don't need to consult anyone else before making an investment if it makes sense? Pre-Close On my end, and from what I've heard you say, this sounds like a picture-perfect fit for what you want to achieve, but I have to ask, what would stop you from moving forward today? Great, aside from the investment, do you have enough information to make a confident decision about training with us? Closing Question: Assuming finances work, is this something you'd want to move forward with today? — General objection handling.Isolate - If X weren't an issue, would you be moving forward today? Or is there something else holding you back? Reason - Why is that an issue? Solve - How can we make this work? / What would make it work for you? 🟫Level 8 - Logistics. Did the rep present the price and effectively isolate the Value vs Logistics objections using the following questions? Value - Do you think this is worth PRICE? (If NO >> Go to L7) Logistics - Could you get PRICE together? (If YES >> Enroll them) Downpayment - What's the closest to PRICE that you could do today? Duration - How long would it take you to get the PRICE together? Credit Score - And do you know what your credit score is? \n If they are in range >> Offer the exact payment plan that would work based on what they told you \n If they are close >> The lowest we can possibly go for a downpayment is MINIMUM… What would be required to make that happen? \n If they are not close >> Sell the LTO (if available) \n ⬛Level 9 - Objections. Did the rep handle all objections and close the prospect at the full price with the highest downpayment possible today?\n 💠Level 10 - Did the rep run a call so good that all new salespeople should watch it? \n </sales_script> \n ## Output Formatting Rules: \n - All fields shown in the structure are required \n - All string values must be properly escaped if containing quotes \n - No additional fields should be added \n - No comments or trailing commas allowed \n ## Output Format Requirements \n Your analysis must be provided as valid JSON matching exactly this structure WITHOUT the comments: \n { 'frame': { 'is_sales_call': { 'evidence': '', // Must include the most definitive direct quote(s) verbatim from the transcript. Include context where necessary. 'reasoning': '', // Must be your thought process of evaluating that evidence to determine the result, 'result': 1|0 // Must be exactly 1 (Yes it is a sales call) or 0 (No it is not a sales call). If unsure, default to 0 }, 'is_first_call': { \n 'evidence': '', // Must include the most definitive direct quote(s) verbatim from the transcript. Include context where necessary. \n 'reasoning': '', // Must be your thought process of evaluating that evidence to determine the result \n 'result': 1|0 // Must be exactly 1 (Yes it is the first call between the salesperson and the prospect) or 0 (No). If unsure, default to 0}, \n 'is_price_after_pitch': { 'evidence': '', // Must include the most definitive direct quote(s) verbatim from the transcript. Include context where necessary. \n 'reasoning': '', // Must be your thought process of evaluating that evidence to determine the result. \n 'result': 1|0 // Must be exactly 1 (Yes the price was not disclosed until after the product was pitched, and it was after the 30min mark) or 0 (No, the price was disclosed before the product was pitched OR it was disclosed before the 30 minute mark). Default to 0 if unsure.}, 'time': { 'evidence': '', // Must include the most definitive direct quote(s) verbatim from the transcript. Include context where necessary. \n'reasoning': '', // Must be your thought process of evaluating that evidence to determine the result.\n 'asked': 1|0, // Must be exactly 1 (Yes the sales rep explicitly asked if the prospect had a hard stop or time constraint for the call) or 0 (No). If unsure, default to 0 \n'result': 1|0 // Must be exactly 1 (Yes the prospect did have a hard stop or time constraint) or 0 (No). If unsure, default to 1 }, 'auth': { 'evidence': '', // Must include the most definitive direct quote(s) verbatim from the transcript. Include context where necessary.\n 'reasoning': '', // Must be your thought process of evaluating that evidence to determine the result \n 'asked': 1|0, // Must be exactly 1 (Yes the sales rep explicitly asked if the prospect had the authority to make a decision on their own) or 0 (No). If unsure, default to 0 \n 'result': 1|0 // Must be exactly 1 (Yes the prospect did have the authority to make a decision on their own) or 0 (No, they needed to consult someone else like a spouse). If unsure, default to 0 } }, 'levels': { 'level_1': { 'evidence': '', // Must include the most definitive direct quote(s) verbatim from the transcript. Include context where necessary. 'reasoning': '', // Must be your thought process of evaluating that evidence to determine the result \n 'effective': '', // Must be your notes on what the rep did well in this level \n 'improvement': '', // Must be your notes on what the rep could have done better in this level. \n 'result': 0-10 // Must be exactly an integer in the range of 0 (low) to 10 (high) indicating the sales rep's skill at executing this level, as measured by the main question for each level (e.g. Did the rep find a deep emotional pain that is already driving action today?). If they get the result but in an unorthodox way, that is acceptable - I only care about the result and not the method; however a 10 is reserved for following the method.}, 'level_2': { 'evidence': '', 'reasoning': '', 'effective': '', 'improvement': '', 'result': 0-10 }, ... ## Notes on each level. \n 1. The rep should have a greeting, context gathering, time check, expectations setting, and spouse check (assuming it's the first call; if not, a minimal frame is fine) \n 2. The rep should isolate their biggest frustration (or pain) based on what they are experiencing today \n 3. The rep should find the root cause of the frustration that is within their control \n 4. The rep should find a deep emotional pain that is already driving action today \n 5. The rep should find a financial cost 10x the offer cost that would motivate action \n 6. The rep should build an effective bridge with high engagement (tying each pillar to solving their problem), resulting in strong belief that the product will solve the prospect's deep emotional pain. \n 7. The rep should effectively unblock the bridge by pre-handling all non-financial objections (results, probability, timing, effort/sacrifice, decision making) as demonstrated with a pre close \n 8. The rep should follow the process in Level 8 exactly in order to effectively identify if there is a value or logistics objection (or neither) \n 9. The rep should handle all objections that come up so that the prospect attempts to make a purchase with the highest downpayment possible today based on the prospect's logistics (standard pricing is fine). If the prospect attempts to make a purchase at the full standard pricing, this is automatically a \n 10. This is either a 1 or 0. It is only a 1 if all of the above are at least an 8 and the sale is made. Otherwise it is a 0. }, 'problem_value': { 'evidence': '', // Must include the most definitive direct quote(s) verbatim from the transcript. Include context where necessary. \n 'reasoning': '', // Must be your thought process of evaluating that evidence to determine the result \n 'asked': 1|0, // Must be exactly 1 (Yes the sales rep was able to get a dollar value to represent the prospect's problem) or 0 (No). If unsure, default to 0 \n'result': 0|'' // Must be the integer of the dollar value that solving the prospect's problem is worth to them. If unsure, default to 0 }, \n 'objections': { \n 'objection_fit': { 'evidence': '', // Must include the most definitive direct quote(s) verbatim from the transcript. Include context where necessary. \n 'reasoning': '', // Must be your thought process of evaluating that evidence to determine the result \n 'present': 0|1, // Must be exactly 1 (Yes this objection was present) or 0 (No). If unsure, default to 1 \n 'handled': 0|1 // Must be exactly 1 (Yes the sales rep handled the objection so that it was not a blocker to buying today) or 0 (No). If unsure, default to 0 }, 'objection_timing': { 'evidence': '', 'reasoning': '', 'present': 0|1, 'handled': 0|1 }, ... /* ## Notes on each objection objection_fit - This is the 'I am not sure it will work for me' special snowflake objection. It rarely uses these exact words, but it's easy to spot when the prospect doesn't think it will actually work, or estimates the probability to be low. objection_timing - This is the 'I will do it when or after X event/situation' (at least a week, and typically months later) objection. IMPORTANT: The following are not timing objections [delaying of making the decision (that's avoidance), I need to sleep on it, I need to think about it, let's follow up on Monday] objection_time - This is the 'I do not have enough time IN THE DAY' objection, specifically referring to their inability to fit it into a day. IMPORTANT: The following are not time objections [I can't do it until next month, I need to sleep on it, I need to think on it, let's follow up on Monday] objection_authority - This is the 'I need to talk with my spouse/boss/etc. about it' objection, in which the person abdicates decision making ability to someone else so that they don't need to make a decision on the spot. objection_avoidance - This is the 'I have to think about it' / 'I need more time' / 'I do not make decisions on the phone' objection, which is the prospect's way of avoiding having to make a mistake. IMPORTANT: The following are not avoidance objections [I need to talk with my spouse, I'm going to talk it over with my wife and then get back to you] */ }, 'logistics': { 'value': { // Do you think this is worth PRICE? 'evidence': '', // Must include the most definitive direct quote(s) verbatim from the transcript. Include context where necessary. 'reasoning': '', // Must be your thought process of evaluating that evidence to determine the result 'asked': 0|1, // Must be exactly 1 (Yes the salesperson asked this question) or 0 (No). If unsure, default to 0 \n 'result': 0|1 // Must be exactly 1 (Yes the prospect thinks the cost is reasonable, even if they don't have the finances for it) or 0 (No). If unsure, default to 0 }, 'logistics': { // Could you get PRICE together? 'evidence': '', 'reasoning': '', 'asked': 0|1, 'result': 0|1 }, 'downpayment': { // What's the closest to PRICE that you could do today? 'evidence': '', 'reasoning': '', 'asked': 0|1, 'result': 0|'' // Must be the integer dollar amount the prospect says they have available today in response to the question. If the salesperson doesn't ask or if unsure, default to 0. }, 'duration': { // How long would it take you to get the PRICE together? \n 'evidence': '', 'reasoning': '', 'asked': 0|1, 'result': 0|'' // Must be the integer number of months required for the prospect to get the remaining funds for the product. If the salesperson doesn't ask or if unsure, default to 0. }, 'credit': { // Credit Score - And do you know what your credit score is? 'evidence': '', 'reasoning': '', 'asked': 0|1, 'result': 0|'' // Must be the integer number of the prospect's credit score. If they say something like 'excellent' or a range, use the low end of the range. If the salesperson doesn't ask or if the prospect does not know, default to 0. } }, 'outcome': { 'won': { 'evidence': '', 'reasoning': '', 'result': 0|1, // Must be exactly 1 (Yes the call was won with a purchase) or 0 (No). If unsure, default to 0 }, 'follow_up_scheduled': { 'evidence': '', 'reasoning': '', 'result': 0|1, // Must be exactly 1 (Yes there is a follow up meeting scheduled with a specific date and time) or 0 (No). If unsure, default to 0 }, 'follow_up': { 'evidence': '', 'reasoning': '', 'result': 0|1, // Must be exactly 1 (Yes there is follow up intention) or 0 (No). If unsure, default to 0 }, 'call_dropped': { 'evidence': '', 'reasoning': '', 'result': 0|1 // Must be exactly 1 (Yes the call dropped suddenly and the salesperson was left hanging) or 0 (No). If unsure, default to 0 }, 'lost': { 'evidence': '', 'reasoning': '', 'result': 0|1, // Must be exactly 1 (Yes the call was lost with no follow up intention) or 0 (No). If unsure, default to 1 } } }`,
  },
];

const Authorization = `Bearer ${process.env.OPEN_AI_KEY}`;

exports.processOpenAI = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.set("Access-Control-Allow-Methods", "GET, POST"); // Allow methods
  res.set("Access-Control-Allow-Headers", "Content-Type");

  console.log(req.body.callTranscript);

  try {
    const openAiResponse = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: messages(req.body.transcript),
      },
      {
        headers: {
          Authorization,
          "Content-Type": "application/json",
        },
      }
    );

    const result = openAiResponse.data?.choices[0]?.message?.content
      ?.replace(/\s+/g, " ")
      ?.trim();

    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    console.error(error);
    res.status(500).json({
      error: error.response
        ? error.response.data
        : "Failed to fetch OpenAI response",
    });
  }
});
