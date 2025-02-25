import React, { memo, useCallback, useContext, useMemo, forwardRef } from 'react';

const FormFieldContext = React.createContext(null);

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return useMemo(() => ({
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }), [fieldContext, itemContext, fieldState]);
};

const FormItemContext = React.createContext({ id: '' });

const FormItem = memo(forwardRef((props, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className="space-y-2" {...props} />
    </FormItemContext.Provider>
  );
}));
FormItem.displayName = "FormItem";

const FormLabel = memo(forwardRef(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={`error && "text-destructive" ${className}`}
      htmlFor={formItemId}
      {...props}
    />
  );
}));
FormLabel.displayName = "FormLabel";

const FormControl = memo(forwardRef((props, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
}));
FormControl.displayName = "FormControl";

const FormDescription = memo(forwardRef((props, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className="text-sm text-muted-foreground"
      {...props}
    />
  );
}));
FormDescription.displayName = "FormDescription";

const FormMessage = memo(forwardRef((props, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : props.children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className="text-sm font-medium text-destructive"
      {...props}
    >
      {body}
    </p>
  );
}));
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};