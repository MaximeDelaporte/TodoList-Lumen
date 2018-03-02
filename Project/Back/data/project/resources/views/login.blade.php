<!doctype html>
<html>
<head>
    <title>Test Login</title>
</head>
<body>
{{ Form::open(array('url' => 'login')) }}
<h1>Login</h1>
<!-- if login errors, show here-->
<p>
    {{$errors->first('email')}}
    {{$errors->first('password')}}
</p>
<p>
    {{Form::label('email', 'Email Address')}}
    {{Form::text('email', Input::old('email'), array('placeholder' => 'test@test.com'))}}
</p>
<p>
    {{Form::label('password', 'Password')}}
    {{Form::password('password')}}
</p>
<p>
    {{Form::submit('Submit !') }}
</p>
{{Form::close()}}
<a href="{{ URL::to('logout') }}">Logout</a>
</body>
</html>