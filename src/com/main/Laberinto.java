/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.main;

import android.app.AlertDialog;
import android.os.Bundle;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStreamReader;

//import javax.script.Invocable;
//import javax.script.ScriptEngine;
//import javax.script.ScriptEngineManager;
//import javax.script.ScriptException;
//import sun.nio.cs.StandardCharsets;
//import java.nio.charset.Charset;
//import java.nio.file.Files;
//import java.nio.file.Paths;//
//import android.os.Bundle;
//import android.view.MotionEvent;
//import java.nio.file.Path;

import org.apache.cordova.Config;
import org.apache.cordova.DroidGap;

public class Laberinto extends DroidGap
{
	@Override
	public void onCreate(Bundle savedInstanceState)
	{
		super.onCreate(savedInstanceState);
		// Set by <content src="index.html" /> in config.xml
		super.loadUrl(Config.getStartUrl());
		//super.loadUrl("file:///android_asset/www/index.html")
	}

	/* @Override
	public boolean onTouchEvent(MotionEvent event) {
		int x = (int)event.getX();
		int y = (int)event.getY();
		switch (event.getAction()) {
		case MotionEvent.ACTION_DOWN: show();
		case MotionEvent.ACTION_MOVE:
		case MotionEvent.ACTION_UP:
		}
		return false;
	} */


	/* public void callJS() throws FileNotFoundException, ScriptException, NoSuchMethodException {

			ScriptEngineManager manager = new ScriptEngineManager();
			ScriptEngine engine = manager.getEngineByName("JavaScript");

	//		BufferedReader reader = Files.newBufferedReader(Paths.get("../assets/www/js/jscript.js"), StandardCharsets.UTF_8);
			BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream("/assets/www/js/jscript.js")));


			// read script file
			engine.eval(reader); //Files.newBufferedReader(Paths.get("../assets/www/js/jscript.js"), "UTF_8")  //StandardCharsets.UTF_8

			Invocable inv = (Invocable) engine;
			// call function from script file
			inv.invokeFunction("move", 38);
		} */

	/* public void show(){
		AlertDialog alertDialog = new AlertDialog.Builder(this).create();
		alertDialog.setTitle("Reset...");
		alertDialog.setMessage("Are you sure?");
		//		alertDialog.setButton("OK", new DialogInterface.OnClickListener() {
		//		public void onClick(DialogInterface dialog, int which) {
		//		// here you can add functions
		//		}
		//		});
		alertDialog.setIcon(R.drawable.icon);
		alertDialog.show();
	} */

}


